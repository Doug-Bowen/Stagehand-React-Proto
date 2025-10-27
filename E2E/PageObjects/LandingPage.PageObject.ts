import { Page } from '@playwright/test';
import { UrlsUtil } from '../Utils/Urls.Util';
const urls = new UrlsUtil();

export class LandingPage {
    async navigate(page: Page) { 
        await page.goto(urls._landingPage); 
    }
}
