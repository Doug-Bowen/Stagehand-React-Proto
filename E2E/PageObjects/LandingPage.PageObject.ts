import { Page } from '@playwright/test';
import { UrlsUtil } from '../Utils/Urls.Util';
const urls = new UrlsUtil();

export class LandingPage {
    async navigate(page: Page) { 
        await page.goto(urls._landingPage); 
    }

    // AI-powered actions using Stagehand
    async clickAllTabs(page: any) {
        if (typeof page.act === 'function') {
            return await page.act("click all of the tabs on the page");
        } else {
            throw new Error("AI actions require Stagehand-enhanced page object");
        }
    }

    async extractWidgetCount(page: any) {
        if (typeof page.extract === 'function') {
            return await page.extract({
                instruction: "extract the total number of widgets",
                schema: { totalWidgets: "number" }
            });
        } else {
            throw new Error("AI extraction requires Stagehand-enhanced page object");
        }
    }
}
