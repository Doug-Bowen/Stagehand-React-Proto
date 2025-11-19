export class NavigationUtil {
    landingPage: string = 'http://localhost:3000/app2';
    originalApp: string = 'http://localhost:3000/';
    app2: string = 'http://localhost:3000/app2';

    async browseTo(page: any,url: string) {
        await page.goto(url);
    }
}