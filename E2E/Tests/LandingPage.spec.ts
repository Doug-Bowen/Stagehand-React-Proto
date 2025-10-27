// @ts-nocheck
import { test, expect } from '@playwright/test';
import { Stagehand } from '@browserbasehq/stagehand';
import { LandingPage } from '../PageObjects/LandingPage.PageObject';

const landingPage = new LandingPage();

test(`Verify Widgets`, async ({ page }) => {
    // Arrange
    const stagehand = new Stagehand({ 
        env: "LOCAL", 
        verbose: 1, 
        debugDom: true, 
        enableCaching: false 
    });
    await stagehand.init();
    const stagehandPage = stagehand.page; // Get the enhanced page from Stagehand
    const expectedTotalFiles = 86;
    
    // Act
    await landingPage.navigate(stagehandPage); // Use stagehand page instead of playwright page
    await stagehandPage.act("click all of the tabs on the page"); // Use stagehand page

    // Assert
   
});

