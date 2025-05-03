import { test } from '@playwright/test';
import { newTestUserCredentials } from '../data/credentialsMarktplaats';
import RegisterMarktplaatsPage from '../pages/RegisterMarktplaatsPage';
import { CookiePolicyHandler } from '../helpers/CookiePolicyHandler';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.marktplaats.nl/'); 
});

test('Register on Marktplaats', async ({ page, context }) => {
    const registerPage = new RegisterMarktplaatsPage(page);
    const cookiePolicyHandler = new CookiePolicyHandler(page);
  
    await cookiePolicyHandler.acceptCookieConsent(); // Accept cookies if the consent banner is present

    await registerPage.navigateToRegistrationPage();

    await registerPage.populateRegistrationForm(newTestUserCredentials);

    await registerPage.submitForm();

    await registerPage.expectSuccessfulRegistration();
    await context.storageState({ path: 'state-marktplaats.json' });
  });

  test('Login on Marktplaats', async ({ page, context }) => {
    const registerPage = new RegisterMarktplaatsPage(page);
    const cookiePolicyHandler = new CookiePolicyHandler(page);
  
    await cookiePolicyHandler.acceptCookieConsent(); // Accept cookies if the consent banner is present

    await registerPage.loginLink.click();
    await page.getByRole('textbox', { name: 'E-mailadres' }).fill(newTestUserCredentials.email);
    await page.getByRole('textbox', { name: 'Wachtwoord' }).fill(newTestUserCredentials.password);
    await page.getByRole('button', { name: 'Inloggen' }).click();
  })
