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
      enableCaching: false,
      disablePino: true, // Disable Pino logger for cleaner output
      logger: () => {}, // Override logger to suppress all logs
    });
    
    await stagehand.init();
    
    // Create enhanced page with agent access
    const enhancedPage = Object.create(stagehand.page);
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
                verbose: 0,                            // 0 = minimal logging, 1 = medium, 2 = detailed
                enableCaching: false,                  // Disable caching for fresh data each run
                disablePino: true,                     // Disable Pino logger for cleaner output
                logger: () => {},                      // Override logger to suppress all logs
            });
            
            await this.stagehand.init();
            this.initialized = true;
            
            // Set up page and agent as direct properties
            this.page = this.stagehand.page;
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
