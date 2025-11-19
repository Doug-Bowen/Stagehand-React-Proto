import { test, expect } from '../Utils/stagehand.util';
import { z } from 'zod/v3';
import { NavigationUtil } from '../Utils/navigation.util';
import { Prompts } from '../Utils/prompts';

const navigationUtil = new NavigationUtil();
const prompts = new Prompts();

test(`Fill the Input Controls Form`, async ({ page }) => { 
    // Arrange
    var formData = {
        "First Name": "Alice",
        "Last Name": "Johnson",
        "Reference Number": "12345",
        "Comments": "This is a test comment\nSecond line\nThird line",
        "Technologies": "Material-UI",
    };
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    await page.observe(prompts.observe("Input Controls Form"));
    
    // Act
    await page.act(prompts.fill("First Name field", formData["First Name"]));
    await page.act(prompts.fill("Last Name field", formData["Last Name"]));
    await page.act(prompts.fill("Reference Number field", formData["Reference Number"]));
    await page.act(prompts.fill("Comments field", formData["Comments"]));
    await page.act(prompts.fill("Technologies field", formData["Technologies"]));
    
    const actualFirstName = prompts.extract_text(page, "First Name");
    const actualLastName = prompts.extract_text(page, "Last Name");
    const actualReferenceNumber = prompts.extract_text(page, "Reference Number");
    const actualComments = prompts.extract_text(page, "Comments");
    const actualTechnologies = prompts.extract_text(page, "Technologies");

    // Assert
    expect((await actualFirstName).actual).toBe(formData["First Name"]);
    expect((await actualLastName).actual).toBe(formData["Last Name"]);
    expect((await actualReferenceNumber).actual).toBe(formData["Reference Number"]);
    expect((await actualComments).actual).toBe(formData["Comments"]);
    expect((await actualTechnologies).actual).toBe(formData["Technologies"]);
});

test(`Verify File Count`, async ({ page }) => { 
    // Arrange
    const expectedTotalFiles = 86;
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.act(prompts.clickAll("tabs"));
    const fileData = await page.extract(
        prompts.extract("the total number of files"),
        z.object({ totalFiles: z.number() })
    );
    
    // Assert
    expect(fileData.totalFiles).toBe(expectedTotalFiles);
});

test(`Verify Specific Name`, async ({ page }) => { 
    // Arrange
    const expectedtName = "Smith";
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.act(prompts.click("Data Display tab"));
    const nameData = await page.extract(
        prompts.extract("the last name from the second row of the table"),
        z.object({ actualName: z.string()})
    );
    
    // Assert
    expect(nameData.actualName).toBe(expectedtName);
});

test.skip(`Verify Captcha Success Message`, async ({ page }) => { 
    // Arrange
    const expectedToastValue = "Captcha verified successfully";
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.agent.execute({
        instruction: prompts.solve("captcha"),
        maxSteps: 20,
        highlightCursor: true
    });
    const toastData = await page.extract(
        prompts.waitFor("captcha to be solved") + " and " + prompts.extract("the toast message that appears"),
        z.object({toastMessage: z.string()})
    );

    // Assert
    expect(toastData.toastMessage).toContain(expectedToastValue);
});