import { test as base } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
export { expect } from '@playwright/test';

// Override the Playwright Page test fixture to provide enhanced page with agent
// This custom implementation isn't exactly necessary, but it provides a nice way to access both page and agent
// It creates a hybrid object that has all page methods plus agent
// Normally Stagehand exposes page and agent via methods, but this way you can access them directly as properties
export const test = base.extend<{ page: any }>({
    page: async ({ }, use) => {
        const stagehandUtil = new StagehandUtil();
        await stagehandUtil.ensureInitialized();
        const enhancedPage = Object.create(stagehandUtil.page);
        enhancedPage.agent = stagehandUtil.agent;
        await use(enhancedPage);
        await stagehandUtil.close();
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
                apiKey: process.env.OPENAI_API_KEY,    // Use API key from environment variables
                modelName: "openai/gpt-5",             // Specify the model to use
            });
            
            await this.stagehand.init();
            this.initialized = true;
            
            // Set up page and agent as direct properties
            this.page = this.stagehand.page;
            const AgentConfig = { 
                cua: true,
                model: "openai/computer-use-preview",
                systemPrompt: "You are a helpful assistant for web automation and testing tasks.",
            };
            this.agent = this.stagehand.agent(AgentConfig);
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
