// @ts-nocheck
import { test as base } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';

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
    await use(stagehand.page);
    await stagehand.close();
  },
});

export { expect } from '@playwright/test';

export class StagehandUtil {
    getAgent(system_prompt: string) {
        return this.stagehand.agent({
            cua: true,
            model: {
                modelName: "openai/computer-use-preview",
                apiKey: process.env.OPENAI_API_KEY
            },
            systemPrompt: system_prompt,
        });
    }
}
