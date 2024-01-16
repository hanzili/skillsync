describe('Authentication', () => {

    it('should register a new user', async () => {
        await page.goto('http://localhost:3000/register');

        await page.type('#username', 'testuser');
        await page.type('#email', 'testuser@example.com');
        await page.type('#password', 'testpassword');

        await page.click('button[type="submit"]');
        await page.waitForNavigation();  // Wait for the next page to load

        expect(page.url()).toContain('/dashboard');
    });

    it('should log in an existing user', async () => {
        await page.goto('http://localhost:3000/login');

        await page.type('#email', 'testuser@example.com');
        await page.type('#password', 'testpassword');

        await page.click('button[type="submit"]');
        await page.waitForNavigation();  // Wait for the next page to load

        expect(page.url()).toContain('/dashboard');
    });
});
