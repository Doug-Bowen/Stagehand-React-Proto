// import { PlaywrightTestConfig } from '@playwright/test';

// // Consumes environment variables for tests to utilize
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, './', '.env'), quiet: true });

// const config: PlaywrightTestConfig = {
//     testDir: 'E2E/Tests/',
//     fullyParallel: true,
//     timeout: 180 * 1000, //Global Test Cutoff
//     retries: 0,
//     reporter: [
//         ['list'],
//         ['html', { open: 'never' }]
//     ],
//     use: {
//         headless: false,
//         screenshot: 'only-on-failure',
//         trace: 'retain-on-failure',
//         ignoreHTTPSErrors: true,
//         viewport: { width: 1920, height: 1080 }
//     },
//     projects: [
//         {
//             name: 'Chrome',
//             use: { browserName: 'chromium', channel: 'chromium' }
//         },
//         {
//             name: 'Edge',
//             use: { browserName: 'chromium', channel: 'msedge' }
//         },
//         {
//             name: 'Safari',
//             use: { browserName: 'webkit' }
//         },
//         {
//             name: 'Firefox',
//             use: { browserName: 'firefox' }
//         }
//     ]
// };
// export default config;