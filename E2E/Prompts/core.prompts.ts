export class CorePrompts {
    click = (element: string) => `Click on the ${element} element`;
    clickAll = (element: string) => `Click all of the ${element} elements on the page`;
    conditional = (action: string, condition: string) => `If ${condition}, then ${action}`;
    extract = (target: string, format?: string) => format ? `Extract ${target} from the page in ${format} format` : `Extract ${target} from the page`;
    fill = (element: string, value: string) => `Fill the ${element} with the value ${value}`;
    fillForm = (formName: string, data: any) => `Parse the following data and fill out the ${formName} form. Data: ${JSON.stringify(data)}.  Ensure all fields are filled out based on the data provided.`;
    navigateTo = (page: string) => `Navigate to the ${page} page`;
    observe = (element: string) => `Observe the ${element} on the page`;
    solve = (captchaName: string) => `Solve the ${captchaName} captcha challenge on the page`;
    verify = (noun: string, verb: string) => `Verify ${noun} is ${verb}`;
    waitFor = (element: string) => `Wait for the ${element} to be visible on the page`;
}