import { test as base } from '@playwright/test';
import { Stagehand, type AvailableModel } from '@browserbasehq/stagehand';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../', '.env') });

export { expect } from '@playwright/test';

const STAGEHAND_MODEL: AvailableModel = "openai/gpt-4o";  
const STAGEHAND_VERBOSE: 0 | 1 | 2 = 0; // 0=minimal, 1=medium, 2=detailed
const STAGEHAND_ENV: "LOCAL" | "BROWSERBASE" = "LOCAL";

// Purpose: To provide tests easy access to both Stagehand page and agent via the Playwright test fixture
// Reasoning: This allows tests to use both page interactions and agent capabilities seamlessly
// Notes: This custom implementation isn't exactly necessary, but it makes your tests read exactly like Playwright tests
// Method: It creates a hybrid object that has all page methods plus agent.Normally Stagehand exposes page and agent via methods, but this way you can access them directly as properties of your page objects
export const test = base.extend<{ page: any }>({
  page: async ({ }, use, testInfo) => {
    const stagehand = new Stagehand({
      env: STAGEHAND_ENV,
      model: STAGEHAND_MODEL,
      verbose: STAGEHAND_VERBOSE,
      logger: quietLogger,
    });
    
    await stagehand.init();
    
    // Get the page from the new context API
    const page = stagehand.context.pages()[0];
    
    // Create enhanced page with Stagehand methods
    const enhancedPage = Object.create(page);
    enhancedPage.act = (instruction: string, options?: any) => stagehand.act(instruction, { ...options, page });
    enhancedPage.extract = (instructionOrOptions: any, schema?: any, options?: any) => {
      if (typeof instructionOrOptions === 'object' && instructionOrOptions.instruction) {
        // Handle old API format: { instruction, schema }
        return stagehand.extract(instructionOrOptions.instruction, instructionOrOptions.schema, { page });
      } else {
        // Handle new API format: (instruction, schema, options)
        return stagehand.extract(instructionOrOptions, schema, { ...options, page });
      }
    };
    enhancedPage.observe = (instruction: string, options?: any) => stagehand.observe(instruction, { ...options, page });
    enhancedPage.agent = stagehand.agent();
    
    await use(enhancedPage);
    
    // Show simple token count for this test
    if (tokenTracker.length > 0) {
      const totalTokens = tokenTracker.reduce((sum, t) => sum + t.totalTokens, 0);
      console.log(`Tokens used: ${totalTokens}`);
    }
    
    await stagehand.close();
    resetTokenTracking(); // Reset for next test
  },
});

export class StagehandUtil {
    private stagehand: Stagehand | null = null;
    private initialized = false;
    public page: any = null;
    public agent: any = null;

    async ensureInitialized(): Promise<Stagehand> {
        if (!this.initialized) {
            this.stagehand = new Stagehand({
                env: STAGEHAND_ENV,
                model: STAGEHAND_MODEL,
                verbose: STAGEHAND_VERBOSE,
                logger: quietLogger,
            });
            
            await this.stagehand.init();
            this.initialized = true;
            
            // Set up page and agent using new 3.x API
            this.page = this.stagehand.context.pages()[0];
            this.agent = this.stagehand.agent();
        }
        return this.stagehand!;
    }

    async close() {
        if (this.stagehand && this.initialized) {
            await this.stagehand.close();
            this.stagehand = null;
            this.initialized = false;
        }
    }
}

// Token tracking storage
interface TokenUsage {
  operation: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  inferenceTimeMs: number;
  timestamp: string;
}

const tokenTracker: TokenUsage[] = [];
let testStartTime: Date | null = null;

// Custom logger to filter out provider warnings and track token usage
const quietLogger = (logLine: any) => {
  // Filter out provider environment variable warnings
  if (logLine.message && logLine.message.includes("No known environment variable for provider")) {
    return; 
  }

  // Track token usage from auxiliary data
  if (logLine.auxiliary) {
    const aux = logLine.auxiliary;
    const promptTokens = aux.prompt_tokens?.value || aux.promptTokens?.value;
    const completionTokens = aux.completion_tokens?.value || aux.completionTokens?.value;
    const inferenceTime = aux.inference_time_ms?.value || aux.inferenceTimeMs?.value;

    if (promptTokens && completionTokens) {
      const totalTokens = parseInt(promptTokens) + parseInt(completionTokens);
      tokenTracker.push({
        operation: logLine.category || 'unknown',
        promptTokens: parseInt(promptTokens),
        completionTokens: parseInt(completionTokens),
        totalTokens,
        inferenceTimeMs: parseInt(inferenceTime || '0'),
        timestamp: new Date().toISOString()
      });
    }
  }

  // Only log actual errors
  if (logLine.level === 0) {
    console.log(`[${logLine.category || 'LOG'}] ${logLine.message}`);
  }
};

// Export function to get token summary
export const getTokenSummary = () => {
  if (tokenTracker.length === 0) {
    return "📊 No token usage tracked";
  }

  const totalPrompt = tokenTracker.reduce((sum, t) => sum + t.promptTokens, 0);
  const totalCompletion = tokenTracker.reduce((sum, t) => sum + t.completionTokens, 0);
  const totalTokens = totalPrompt + totalCompletion;
  const totalTime = tokenTracker.reduce((sum, t) => sum + t.inferenceTimeMs, 0);

  const operationSummary = tokenTracker.reduce((acc, t) => {
    if (!acc[t.operation]) {
      acc[t.operation] = { count: 0, tokens: 0, time: 0 };
    }
    acc[t.operation].count++;
    acc[t.operation].tokens += t.totalTokens;
    acc[t.operation].time += t.inferenceTimeMs;
    return acc;
  }, {} as Record<string, { count: number, tokens: number, time: number }>);

  let summary = `\n📊 Token Usage Summary (${STAGEHAND_MODEL}):\n`;
  summary += `   Total: ${totalTokens.toLocaleString()} tokens (${totalPrompt.toLocaleString()} prompt + ${totalCompletion.toLocaleString()} completion)\n`;
  summary += `   Time: ${(totalTime / 1000).toFixed(2)}s across ${tokenTracker.length} operations\n`;
  
  if (Object.keys(operationSummary).length > 0) {
    summary += `   By operation:\n`;
    Object.entries(operationSummary).forEach(([op, data]) => {
      summary += `     ${op}: ${data.tokens.toLocaleString()} tokens (${data.count} calls, ${(data.time / 1000).toFixed(1)}s)\n`;
    });
  }

  return summary;
};

// Export function to reset token tracking
export const resetTokenTracking = () => {
  tokenTracker.length = 0;
  testStartTime = new Date();
};

// Auto-reset at the start of each test run
if (tokenTracker.length === 0) {
  testStartTime = new Date();
}