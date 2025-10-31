export class CorePrompts {
    createConditionalPrompt(action: string, condition: string): string {
        return `If ${condition}, then ${action}`;
    }

    navigateTo = (page: string) => `Navigate to the ${page} page`;
    waitFor = (element: string) => `Wait for the ${element} to be visible on the page`;
    verify = (noun: string, verb: string) => `Verify ${noun} is ${verb}`;
    extract = (target: string, format?: string) => format ? `Extract ${target} from the page in ${format} format` : `Extract ${target} from the page`;
    solve = (captchaName: string) => `Solve the ${captchaName} captcha challenge on the page`;
    fillForm = (formName: string, data: any) => `Fill out the ${formName} form with appropriate data: ${JSON.stringify(data)}.  Ensure all fields are filled out based on the data listed.`;
    click = (element: string) => `Click on the ${element} element`;
    clickAll = (element: string) => `Click all of the ${element} elements on the page`;
}