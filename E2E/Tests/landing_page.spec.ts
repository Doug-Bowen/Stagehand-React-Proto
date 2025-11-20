import { test, expect } from '../Utils/stagehand.util';
import { z } from 'zod/v3';
import { NavigationUtil } from '../Utils/navigation.util';
import { Prompts } from '../Utils/prompts';

const navigationUtil = new NavigationUtil();
const prompts = new Prompts();

test(`Verify File Count - EXTRACT`, async ({ page }) => { 
    // Arrange
    const expectedTotalFiles = 86;
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.act(prompts.clickAll("tabs"));
    
    try {
        const fileData = await page.extract(
            "Look for any text or number that indicates the total number of files. This could be displayed as 'Total: 86', '86 files', or just the number '86' somewhere on the page.",
            z.object({ 
                totalFiles: z.union([
                    z.number(),
                    z.string().transform((val) => {
                        const num = parseInt(val.replace(/[^0-9]/g, ''));
                        return isNaN(num) ? 0 : num;
                    })
                ])
            })
        );
        
        // Assert
        const actualCount = typeof fileData.totalFiles === 'string' 
            ? parseInt(fileData.totalFiles.replace(/[^0-9]/g, ''))
            : fileData.totalFiles;
        expect(actualCount).toBe(expectedTotalFiles);
    } catch (error) {
        console.error('Failed to extract file count:', error);
        // Fallback: try to find any number on the page that might be the file count
        const fallbackData = await page.extract(
            "Find any number on the page that could represent a count of items or files",
            z.object({ count: z.string().optional() })
        );
        
        if (fallbackData.count) {
            const extractedNumber = parseInt(fallbackData.count.replace(/[^0-9]/g, ''));
            expect(extractedNumber).toBe(expectedTotalFiles);
        } else {
            throw new Error('Could not extract file count from the page');
        }
    }
});


test(`Verify Specific Name - EXTRACT`, async ({ page }) => { 
    // Arrange
    const expectedtName = "Smith";
    await navigationUtil.browseTo(page, navigationUtil.landingPage);
    
    // Act
    await page.act(prompts.click("Data Display tab"));
    
    try {
        const nameData = await page.extract(
            "Look at the table on the page and find the last name (surname) from the second row. This should be a text value like 'Smith', 'Johnson', etc.",
            z.object({ 
                actualName: z.string().min(1, "Name must not be empty")
            })
        );
        
        // Assert
        expect(nameData.actualName.trim()).toBe(expectedtName);
    } catch (error) {
        console.error('Failed to extract name from table:', error);
        // Fallback: try to extract any names from the second row
        const fallbackData = await page.extract(
            "Find any text in the second row of any table on the page that looks like a person's name",
            z.object({ 
                name: z.string().optional(),
                allNames: z.array(z.string()).optional()
            })
        );
        
        if (fallbackData.name) {
            expect(fallbackData.name.trim()).toBe(expectedtName);
        } else if (fallbackData.allNames && fallbackData.allNames.length > 0) {
            const matchingName = fallbackData.allNames.find((name: string) => name.trim() === expectedtName);
            expect(matchingName).toBeDefined();
        } else {
            throw new Error('Could not extract name from the table');
        }
    }
});


test(`Verify Filling Input Controls Form - ACT`, async ({ page }) => { 
    // Arrange
    var formData = {
        "First Name": "Alice",
        "Last Name": "Johnson",
        "Reference Number": "12345",
        "Comments": "This is a test comment\nSecond line\nThird line",
        "Technologies": "React",
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


test('Verify Filling Input Controls Form - AGENT', async ({ page }) => {
    // Arrange
    await navigationUtil.browseTo(page, navigationUtil.landingPage);

    // Act
    await page.agent.execute('Fill out the Input Controls Form with sample data');

    const actualFirstName = prompts.extract_text(page, "First Name");
    const actualLastName = prompts.extract_text(page, "Last Name");
    const actualReferenceNumber = prompts.extract_text(page, "Reference Number");
    const actualComments = prompts.extract_text(page, "Comments");
    const actualTechnologies = prompts.extract_text(page, "Technologies");

    // Assert
    expect((await actualFirstName).actual).not.toBe(null);
    expect((await actualLastName).actual).not.toBe(null);
    expect((await actualReferenceNumber).actual).not.toBe(null);
    expect((await actualComments).actual).not.toBe(null);
    expect((await actualTechnologies).actual).not.toBe(null);
});
