export class NavigationUtil {
    landingPage: string = 'http://localhost:3000/';
    originalApp: string = 'http://localhost:3000/';
    app2: string = 'http://localhost:3000/app2';
    app3: string = 'http://localhost:3000/app3';

    async browseTo(page: any,url: string) {
        await page.goto(url);
    }
}