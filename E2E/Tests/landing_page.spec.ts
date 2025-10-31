import { test, expect, StagehandUtil } from '../Utils/stagehand.util';
import { z } from 'zod/v3';
import { UrlsUtil } from '../Utils/urls.util';

const urls = new UrlsUtil();

test.skip(`Verify File Count`, async ({ page }) => { 
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
    expect(fileData.totalFiles).toBe(expectedTotalFiles);
});

test.skip(`Verify First Name`, async ({ page }) => { 
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
    expect(nameData.firstName).toBe(expectedFirstName);
});

test(`Solve a Captcha`, async ({ page }) => { 
    // Arrange
    const expectedToastValue = "Captcha verified successfully! You have proven you're human.";
    await page.goto(urls.landingPage);
    
    // Act
    const result = await page.agent.execute({
        instruction: "Solve the captcha on this page",
        maxSteps: 20,
        highlightCursor: true
    });

    // Extract toast data after the action
    const toastData = await page.extract({
        instruction: "extract the toast message that appears",
        schema: z.object({
            toastMessage: z.string()
        })
    });

    // Assert
    expect(toastData.toastMessage).toBe(expectedToastValue);
});
