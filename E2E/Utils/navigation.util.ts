export class NavigationUtil {
    landingPage: string = 'http://localhost:3000/';

    async browseTo(page: any,url: string) {
        await page.goto(url);
    }
}