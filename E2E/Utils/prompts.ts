import { z } from 'zod/v3';

export class Prompts {
    click = (element: string) => `Click on the ${element} element`;
    clickAll = (element: string) => `Click all of the ${element} elements on the page`;
    conditional = (action: string, condition: string) => `If ${condition}, then ${action}`;
    extract = (target: string, format?: string) => format ? `Extract ${target} from the page in ${format} format` : `Extract ${target} from the page`;
    extract_text = async (page: any, text_element_name: string) => {
        try {
            return await page.extract(
                `Extract the text content from the ${text_element_name} element. Return the visible text value.`,
                z.object({ 
                    actual: z.string().transform((val) => val?.trim() || "")
                })
            );
        } catch (error) {
            console.warn(`Failed to extract text for ${text_element_name}:`, error);
            // Fallback with more flexible schema
            return await page.extract(
                `Find any text related to ${text_element_name} on the page`,
                z.object({ 
                    actual: z.union([
                        z.string(),
                        z.null(),
                        z.undefined()
                    ]).transform((val) => val?.toString()?.trim() || "")
                })
            );
        }
    };
    fill = (element: string, value: string) => `Fill the ${element} with the value ${value}`;
    fillForm = (formName: string, data: any) => `Parse the following data and fill out the ${formName} form. Data: ${JSON.stringify(data)}.  Ensure all fields are filled out based on the data provided.`;
    navigateTo = (page: string) => `Navigate to the ${page} page`;
    observe = (element: string) => `Observe the ${element} on the page`;
    solve = (captchaName: string) => `Solve the ${captchaName} captcha challenge on the page`;
    verify = (noun: string, verb: string) => `Verify ${noun} is ${verb}`;
    waitFor = (element: string) => `Wait for the ${element} to be visible on the page`;
}