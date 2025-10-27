// @ts-nocheck
import { test, expect } from '@playwright/test';
import { LandingPage } from '../PageObjects/LandingPage.PageObject';
const landingPage = new LandingPage();

test(`Verify Widgets`, async ({ page }) => {
    // Arrange
    const expectedTotalFiles = 86;
    
    
    // Act
    await landingPage.navigate(page);

    // Assert
    //await page.click(landingPage.getTotalFiles());
    //await expect(landingPage.getTotalFiles()).toBe(expectedTotalFiles);
});
