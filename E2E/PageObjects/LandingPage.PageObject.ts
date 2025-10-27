// @ts-nocheck
import { Page } from '@playwright/test';
import { UrlsUtil } from '../Utils/Urls.Util';
const urls = new UrlsUtil();

export class LandingPage {
    constructor(page: Page) {
        this.page = page;
    }
    async navigate() { await this.page.goto(urls._landingPage); }
    async getTotalFiles() { await this.page.$eval('text=86Total Files'); }
}
