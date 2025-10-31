import { test, expect } from '../Utils/stagehand.util';
import { z } from 'zod/v3';
import { NavigationUtil } from '../Utils/navigation.util';
import { CorePrompts } from '../Prompts/core.prompts';

const navigationUtil = new NavigationUtil();
const corePrompts = new CorePrompts();

test(`Fill the Input Controls Form`, async ({ page }) => { 
    // Arrange
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    var formData = {
        "Text Input": "Alice",
        "Multiline": "Johnson\nDiego\nCharster",
        "Email": "alice.johnson@example.com",
        "Technologies": "Material-UI",
    };

    // Act
    await page.act(corePrompts.fillForm("Input Controls Form", formData));

    // Assert
    await page.screenshot({ path: 'E2E/Screenshots/InputControlsFormFilled.png' });
});

test(`Verify File Count`, async ({ page }) => { 
    // Arrange
    const expectedTotalFiles = 86;
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.act(corePrompts.clickAll("tabs"));
    const fileData = await page.extract({
        instruction: corePrompts.extract("the total number of files"),
        schema: z.object({ totalFiles: z.number() }),
    });
    
    // Assert
    expect(fileData.totalFiles).toBe(expectedTotalFiles);
});

test(`Verify Specific Name`, async ({ page }) => { 
    // Arrange
    const expectedtName = "Smith";
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.act(corePrompts.click("Data Display tab"));
    const nameData = await page.extract({
        instruction: corePrompts.extract("the last name from the second row of the table"),
        schema: z.object({ actualName: z.string()})
    });
    
    // Assert
    expect(nameData.actualName).toBe(expectedtName);
});

test(`Verify Captcha Success Message`, async ({ page }) => { 
    // Arrange
    const expectedToastValue = "Captcha verified successfully";
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.agent.execute({
        instruction: corePrompts.solve("captcha"),
        maxSteps: 20,
        highlightCursor: true
    });
    const toastData = await page.extract({
        instruction: corePrompts.waitFor("captcha to be solved") + " and " + corePrompts.extract("the toast message that appears"),
        schema: z.object({toastMessage: z.string()})
    });

    // Assert
    expect(toastData.toastMessage).toContain(expectedToastValue);
});
