import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

interface TokenMetrics {
  actPromptTokens: number;
  actCompletionTokens: number;
  extractPromptTokens: number;
  extractCompletionTokens: number;
  observePromptTokens: number;
  observeCompletionTokens: number;
}

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

    // Cost Estimation (approximate, adjust rates based on your model)
    const estimatedCost = this.calculateEstimatedCost(totalPromptTokens, totalCompletionTokens);
    console.log(`\n💰 ESTIMATED COST: $${estimatedCost.toFixed(4)}`);

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
    // GPT-4o pricing (adjust based on your model)
    const promptRate = 0.000005; // $0.005 per 1K tokens
    const completionRate = 0.000015; // $0.015 per 1K tokens
    
    return (promptTokens / 1000 * promptRate) + (completionTokens / 1000 * completionRate);
  }
}

export default StagehandTokenReporter;