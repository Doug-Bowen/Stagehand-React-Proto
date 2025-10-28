// @ts-nocheck
import { test, expect } from '../Utils/StagehandFixture';
import { LandingPage } from '../PageObjects/LandingPage.PageObject';
import { z } from 'zod/v3';
import { UrlsUtil } from '../Utils/Urls.Util';
const urls = new UrlsUtil

test(`Verify File Count`, async ({ page }) => { 
    // Arrange
    const expectedTotalFiles = 86;
    await page.goto(urls.landingPage);
    
    // Act
    await page.act("click all of the tabs on the page");
    const fileData = await page.extract({
        instruction: "extract the total number of files",
        schema: z.object({
            totalFiles: z.number()
        })
    });
    
    // Assert
    console.log("Extracted data:", fileData);
    expect(fileData.totalFiles).toBe(expectedTotalFiles);
});

test(`Verify First Name`, async ({ page }) => { 
    // Arrange
    const expectedFirstName = "John";
     await page.goto(urls.landingPage);
    
    // Act
    await page.act("Click the Data Display tab");
    const nameData = await page.extract({
        instruction: "extract the first name from the table",
        schema: z.object({
            firstName: z.string()
        })
    });
    
    // Assert
    console.log("Extracted data:", nameData);
    expect(nameData.firstName).toBe(expectedFirstName);
});

test(`Solve a Captcha`, async ({ page }) => { 
    // Arrange
    const expectedToastValue = "Captcha verified successfully! You have proven you're human.";
    await page.goto(urls.landingPage);
    
    // Act
    await page.act("Click the Captcha tab");
    await agent.execute("Solve the captcha on the page");
    const toastData = await page.extract({
        instruction: "extract the toast message after the captcha is solved",
        schema: z.object({
            toastMessage: z.string()
        })
    });
    
    // Assert
    console.log("Extracted data:", toastData);
    expect(toastData.toastMessage).toBe(expectedToastValue);
});
