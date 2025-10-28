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

// Updated October 2025
const MODEL_PRICING = {
  'gpt-5': { prompt: 0.010, completion: 0.030 },
  'gpt-5-turbo': { prompt: 0.008, completion: 0.024 },
  'gpt-5-mini': { prompt: 0.002, completion: 0.006 },
  'gpt-4o': { prompt: 0.005, completion: 0.015 },
  'gpt-4o-mini': { prompt: 0.00015, completion: 0.0006 },
  'gpt-4-turbo': { prompt: 0.01, completion: 0.03 },
  'gpt-4': { prompt: 0.03, completion: 0.06 },
  'gpt-3.5-turbo': { prompt: 0.001, completion: 0.002 },
  'gpt-3.5-turbo-instruct': { prompt: 0.0015, completion: 0.002 },
  'claude-3.5-sonnet': { prompt: 0.003, completion: 0.015 },
  'claude-3-opus': { prompt: 0.015, completion: 0.075 },
  'claude-3-sonnet': { prompt: 0.003, completion: 0.015 },
  'claude-3-haiku': { prompt: 0.00025, completion: 0.00125 },
  'gemini-1.5-pro': { prompt: 0.0035, completion: 0.0105 },
  'gemini-1.5-flash': { prompt: 0.000075, completion: 0.0003 },
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
  
  private modelName: keyof typeof MODEL_PRICING = 'gpt-4o';

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
    const totalPromptTokens = this.totalTokens.actPromptTokens + 
                             this.totalTokens.extractPromptTokens + 
                             this.totalTokens.observePromptTokens;
    
    const totalCompletionTokens = this.totalTokens.actCompletionTokens + 
                                 this.totalTokens.extractCompletionTokens + 
                                 this.totalTokens.observeCompletionTokens;

    // Cost Estimation
    const estimatedCost = this.calculateEstimatedCost(totalPromptTokens, totalCompletionTokens);
    console.log(`💰 ESTIMATED COST: $${estimatedCost.toFixed(4)}`);
  }

  private calculateEstimatedCost(promptTokens: number, completionTokens: number): number {
    const pricing = MODEL_PRICING[this.modelName] || MODEL_PRICING.default;
    const promptCost = (promptTokens / 1000) * pricing.prompt;
    const completionCost = (completionTokens / 1000) * pricing.completion;
    
    return promptCost + completionCost;
  }
}

export default StagehandTokenReporter;