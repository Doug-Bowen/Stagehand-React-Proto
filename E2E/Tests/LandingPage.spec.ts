// @ts-nocheck
import { test, expect } from '../Utils/StagehandFixture';
import { LandingPage } from '../PageObjects/LandingPage.PageObject';
import { z } from 'zod/v3';

const landingPage = new LandingPage();

test(`Verify File Count`, async ({ stagehandPage }) => { 
    // Arrange
    const expectedTotalFiles = 86;
    await landingPage.navigate(stagehandPage);
    
    // Act
    await stagehandPage.act("click all of the tabs on the page");
    
    // Assert
    const fileData = await stagehandPage.extract({
        instruction: "extract the total number of files",
        schema: z.object({
            totalFiles: z.number()
        })
    });
    
    console.log("Extracted data:", fileData);
    expect(fileData.totalFiles).toBe(expectedTotalFiles);
});

test(`Verify First Name`, async ({ stagehandPage }) => { 
    // Arrange
    const expectedFirstName = "John";
    await landingPage.navigate(stagehandPage);
    
    // Act
    await stagehandPage.act("Click the Data Display tab");
    
    // Assert
    const nameData = await stagehandPage.extract({
        instruction: "extract the first name from the table",
        schema: z.object({
            firstName: z.string()
        })
    });

    console.log("Extracted data:", nameData);
    expect(nameData.firstName).toBe(expectedFirstName);
});

