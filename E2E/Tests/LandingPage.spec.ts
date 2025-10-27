// @ts-nocheck
import { test, expect } from '@playwright/test';
import { LandingPage } from '../PageObjects/LandingPage.PageObject';
import { UiComponentsUtil } from "../Utils/UiComponents.Util";
const uiComponents = new UiComponentsUtil();
const landingPage = new LandingPage();
const browsers = uiComponents._browsers;

browsers.forEach((browser) =>
{
    test.use({ browserName: browser, headless: true });
    test(`Verify Widgets in ${browser.toString()}`, async ({ page }) => {
        // Arrange
        const expectedTotalFiles = 86;

        // Act
        await landingPage.navigate();

        // Assert
        //await page.click(landingPage.getTotalFiles());
        //await expect(landingPage.getTotalFiles()).toBe(expectedTotalFiles);
    });
});
