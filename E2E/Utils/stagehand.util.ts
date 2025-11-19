import { test as base } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
export { expect } from '@playwright/test';

// Purpose: To provide tests easy access to both Stagehand page and agent via the Playwright test fixture
// Reasoning: This allows tests to use both page interactions and agent capabilities seamlessly
// Notes: This custom implementation isn't exactly necessary, but it makes your tests read exactly like Playwright tests
// Method: It creates a hybrid object that has all page methods plus agent.Normally Stagehand exposes page and agent via methods, but this way you can access them directly as properties of your page objects
export const test = base.extend<{ page: any }>({
  page: async ({ }, use, testInfo) => { 
    const stagehand = new Stagehand({
      env: "LOCAL",
      verbose: 0, // 0 = minimal logging, 1 = medium, 2 = detailed
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
    enhancedPage.agent = stagehand.agent;
    
    await use(enhancedPage);
    await stagehand.close();
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
                env: "LOCAL",
                verbose: 0, // 0 = minimal logging, 1 = medium, 2 = detailed
            });
            
            await this.stagehand.init();
            this.initialized = true;
            
            // Set up page and agent using new 3.x API
            this.page = this.stagehand.context.pages()[0];
            this.agent = this.stagehand.agent;
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
