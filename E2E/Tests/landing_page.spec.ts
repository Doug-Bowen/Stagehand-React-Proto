// @ts-nocheck
import { test, expect } from '../Utils/StagehandFixture';
import { z } from 'zod/v3';
import { UrlsUtil } from '../Utils/urls.util';
import { StagehandUtil } from '../Utils/stagehand.util';

const stagehandUtil = new StagehandUtil(stagehand);
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
    const agent = stagehandUtil.getAgent();
    const expectedToastValue = "Captcha verified successfully! You have proven you're human.";
    await page.goto(urls.landingPage);
    
    // Act
    await agent.execute({
        instruction: "Go to Hacker News and find the most controversial post from today, then read the top 3 comments and summarize the debate.",
        maxSteps: 20,
        highlightCursor: true
});

    // Assert
    expect(toastData.toastMessage).toBe(expectedToastValue);
});
