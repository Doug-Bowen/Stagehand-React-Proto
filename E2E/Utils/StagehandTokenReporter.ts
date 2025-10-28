import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

/**
 * Stagehand Token Usage Reporter
 * 
 * This reporter tracks and estimates costs for AI token usage in Stagehand tests.
 * 
 * To configure the model for cost estimation:
 * 1. Update the 'modelName' property in the class (default: 'gpt-4o')
 * 2. Or pass it in playwright.config.ts: ['./E2E/Utils/StagehandTokenReporter.ts', { model: 'gpt-5' }]
 * 3. Or modify the MODEL_PRICING object below to add/update pricing
 */

interface TokenMetrics {
  actPromptTokens: number;
  actCompletionTokens: number;
  extractPromptTokens: number;
  extractCompletionTokens: number;
  observePromptTokens: number;
  observeCompletionTokens: number;
}

// Model pricing configuration (per 1K tokens) - Updated October 2025
const MODEL_PRICING = {
  // GPT-5 Family (Projected/Estimated - adjust when official pricing available)
  'gpt-5': { prompt: 0.010, completion: 0.030 },
  'gpt-5-turbo': { prompt: 0.008, completion: 0.024 },
  'gpt-5-mini': { prompt: 0.002, completion: 0.006 },
  
  // GPT-4 Family
  'gpt-4o': { prompt: 0.005, completion: 0.015 },
  'gpt-4o-mini': { prompt: 0.00015, completion: 0.0006 },
  'gpt-4-turbo': { prompt: 0.01, completion: 0.03 },
  'gpt-4': { prompt: 0.03, completion: 0.06 },
  
  // GPT-3.5 Family
  'gpt-3.5-turbo': { prompt: 0.001, completion: 0.002 },
  'gpt-3.5-turbo-instruct': { prompt: 0.0015, completion: 0.002 },
  
  // Claude Family (Anthropic)
  'claude-3.5-sonnet': { prompt: 0.003, completion: 0.015 },
  'claude-3-opus': { prompt: 0.015, completion: 0.075 },
  'claude-3-sonnet': { prompt: 0.003, completion: 0.015 },
  'claude-3-haiku': { prompt: 0.00025, completion: 0.00125 },
  
  // Gemini Family (Google)
  'gemini-1.5-pro': { prompt: 0.0035, completion: 0.0105 },
  'gemini-1.5-flash': { prompt: 0.000075, completion: 0.0003 },
  
  // Default fallback (GPT-4o pricing)
  'default': { prompt: 0.005, completion: 0.015 }
} as const;

class StagehandTokenReporter implements Reporter {
  private totalTokens: TokenMetrics = {
    actPromptTokens: 0,
    actCompletionTokens: 0,
    extractPromptTokens: 0,
    extractCompletionTokens: 0,
    observePromptTokens: 0,
    observeCompletionTokens: 0,
  };

  private testMetrics: Map<string, TokenMetrics> = new Map();
  
  // Configure the model used for cost estimation
  // You can change this to match the model Stagehand is actually using
  private modelName: keyof typeof MODEL_PRICING = 'gpt-4o'; // Default to GPT-4o

  constructor(options?: { model?: keyof typeof MODEL_PRICING }) {
    if (options?.model) {
      this.modelName = options.model;
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const tokenData = result.attachments.find(
      attachment => attachment.name === 'stagehand-metrics'
    );

    if (tokenData && tokenData.body) {
      try {
        const metrics = JSON.parse(tokenData.body.toString());
        this.testMetrics.set(test.title, metrics);
        this.totalTokens.actPromptTokens += metrics.actPromptTokens || 0;
        this.totalTokens.actCompletionTokens += metrics.actCompletionTokens || 0;
        this.totalTokens.extractPromptTokens += metrics.extractPromptTokens || 0;
        this.totalTokens.extractCompletionTokens += metrics.extractCompletionTokens || 0;
        this.totalTokens.observePromptTokens += metrics.observePromptTokens || 0;
        this.totalTokens.observeCompletionTokens += metrics.observeCompletionTokens || 0;
      } catch (error) {
        console.warn('Failed to parse token metrics:', error);
      }
    }
  }

  async onEnd(result: FullResult): Promise<void> {
    console.log('\n' + '='.repeat(80));
    console.log('🤖 STAGEHAND TOKEN USAGE REPORT');
    console.log('='.repeat(80));

    const totalPromptTokens = this.totalTokens.actPromptTokens + 
                             this.totalTokens.extractPromptTokens + 
                             this.totalTokens.observePromptTokens;
    
    const totalCompletionTokens = this.totalTokens.actCompletionTokens + 
                                 this.totalTokens.extractCompletionTokens + 
                                 this.totalTokens.observeCompletionTokens;

    const totalTokens = totalPromptTokens + totalCompletionTokens;

    // Overall Summary
    console.log('\n📊 OVERALL SUMMARY:');
    console.log(`Total Tokens Used: ${totalTokens.toLocaleString()}`);
    console.log(`├── Prompt Tokens: ${totalPromptTokens.toLocaleString()}`);
    console.log(`└── Completion Tokens: ${totalCompletionTokens.toLocaleString()}`);

    // Breakdown by Action Type
    console.log('\n🎯 BY ACTION TYPE:');
    console.log(`ACT Operations:`);
    console.log(`├── Prompt: ${this.totalTokens.actPromptTokens.toLocaleString()}`);
    console.log(`└── Completion: ${this.totalTokens.actCompletionTokens.toLocaleString()}`);
    
    console.log(`EXTRACT Operations:`);
    console.log(`├── Prompt: ${this.totalTokens.extractPromptTokens.toLocaleString()}`);
    console.log(`└── Completion: ${this.totalTokens.extractCompletionTokens.toLocaleString()}`);
    
    console.log(`OBSERVE Operations:`);
    console.log(`├── Prompt: ${this.totalTokens.observePromptTokens.toLocaleString()}`);
    console.log(`└── Completion: ${this.totalTokens.observeCompletionTokens.toLocaleString()}`);

    // Cost Estimation
    const estimatedCost = this.calculateEstimatedCost(totalPromptTokens, totalCompletionTokens);
    const pricing = MODEL_PRICING[this.modelName] || MODEL_PRICING.default;
    console.log(`\n💰 ESTIMATED COST: $${estimatedCost.toFixed(4)}`);
    console.log(`├── Model: ${this.modelName}`);
    console.log(`├── Prompt Rate: $${pricing.prompt.toFixed(6)}/1K tokens`);
    console.log(`└── Completion Rate: $${pricing.completion.toFixed(6)}/1K tokens`);

    // Per-Test Breakdown
    if (this.testMetrics.size > 0) {
      console.log('\n📝 PER-TEST BREAKDOWN:');
      this.testMetrics.forEach((metrics, testName) => {
        const testTotal = (metrics.actPromptTokens + metrics.actCompletionTokens +
                          metrics.extractPromptTokens + metrics.extractCompletionTokens +
                          metrics.observePromptTokens + metrics.observeCompletionTokens);
        console.log(`\n  "${testName}": ${testTotal.toLocaleString()} tokens`);
        if (metrics.actPromptTokens + metrics.actCompletionTokens > 0) {
          console.log(`  ├── ACT: ${(metrics.actPromptTokens + metrics.actCompletionTokens).toLocaleString()}`);
        }
        if (metrics.extractPromptTokens + metrics.extractCompletionTokens > 0) {
          console.log(`  ├── EXTRACT: ${(metrics.extractPromptTokens + metrics.extractCompletionTokens).toLocaleString()}`);
        }
        if (metrics.observePromptTokens + metrics.observeCompletionTokens > 0) {
          console.log(`  └── OBSERVE: ${(metrics.observePromptTokens + metrics.observeCompletionTokens).toLocaleString()}`);
        }
      });
    }

    console.log('\n' + '='.repeat(80));
    console.log('Report generated at:', new Date().toISOString());
    console.log('='.repeat(80) + '\n');
  }

  private calculateEstimatedCost(promptTokens: number, completionTokens: number): number {
    const pricing = MODEL_PRICING[this.modelName] || MODEL_PRICING.default;
    
    // Convert pricing from per 1K tokens to per token, then multiply by token counts
    const promptCost = (promptTokens / 1000) * pricing.prompt;
    const completionCost = (completionTokens / 1000) * pricing.completion;
    
    return promptCost + completionCost;
  }
}

export default StagehandTokenReporter;