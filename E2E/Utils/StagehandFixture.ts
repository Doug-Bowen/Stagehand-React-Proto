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
    
    // Capture metrics after test completion
    const metrics = stagehand.stagehandMetrics || {};
    
    // Attach metrics to test result for reporter
    testInfo.attach('stagehand-metrics', {
      body: JSON.stringify(metrics),
      contentType: 'application/json'
    });
    
    await stagehand.close();
  },
});

export { expect } from '@playwright/test';