// @ts-nocheck
import { test, expect } from '../Utils/StagehandFixture';
import { LandingPage } from '../PageObjects/LandingPage.PageObject';
import { z } from 'zod/v3';

const landingPage = new LandingPage();

test(`Verify Widgets with Fixture`, async ({ stagehandPage }) => { 
    // Arrange
    const expectedTotalFiles = 86;
    
    // Act - Use the enhanced page from the fixture
    await landingPage.navigate(stagehandPage);
    await stagehandPage.act("click all of the tabs on the page");
    
    // Assert
    const widgetData = await stagehandPage.extract({
        instruction: "extract the total number of widgets",
        schema: z.object({
            totalWidgets: z.number()
        })
    });
    
    console.log("Extracted data:", widgetData);
});

