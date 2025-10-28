// @ts-nocheck
import { test as base } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';

export const test = base.extend<{ page: any }>({
  page: async ({ }, use) => { 
    const stagehand = new Stagehand({
      env: "LOCAL",
      verbose: 1,
      enableCaching: false
    });
    
    await stagehand.init();
    await use(stagehand.page);
    await stagehand.close();
  },
});

export { expect } from '@playwright/test';