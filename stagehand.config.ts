import { test as base } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
export { expect } from '@playwright/test';

export const test = base.extend<{ page: any }>({
  page: async ({ }, use, testInfo) => { 
    const stagehand = new Stagehand({
      env: "LOCAL",
      verbose: 0, // 0 = minimal logging, 1 = medium, 2 = detailed
      enableCaching: false,
      disablePino: true, // Disable Pino logger for cleaner output
      logger: () => {}, // Override logger to suppress all logs
      model: "openai/gpt-5",
    });
    
    await stagehand.init();
    await use(stagehand.page);
    await stagehand.close();
  },
});
