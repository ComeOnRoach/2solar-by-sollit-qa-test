import { expect, Page, test } from '@playwright/test';
import { CookiePolicyHandler } from '../helpers/CookiePolicyHandler';
import newTestUserCredentials  from '../data/credentialsMarktplaats';
import RegisterMarktplaatsPage from '../pages/RegisterMarktplaatsPage';





test.describe('Register on Marktplaats', () => {
  
  test.skip('Register on Marktplaats', async ({ browser }) => {
    const context = await browser.newContext({ storageState: '.auth/no-auth.json' });
    const page = await context.newPage();
    const registerPage = new RegisterMarktplaatsPage(page);
    const cookiePolicyHandler = new CookiePolicyHandler(page);
    await page.goto('https://www.marktplaats.nl/'); 

    await cookiePolicyHandler.acceptCookieConsent();
    await registerPage.navigateToRegistrationPage();
    await registerPage.populateRegistrationForm(newTestUserCredentials);
    await registerPage.submitForm();
    await registerPage.expectSuccessfulRegistration();
  });
})


test.describe('Login on Marktplaats', () => {

  test('Login on Marktplaats', async ({browser}) => {
    const context = await browser.newContext( {storageState: '.auth/no-auth.json' });
    const page = await context.newPage();

    await page.goto('https://www.marktplaats.nl');

    await page.locator('iframe[title="SP Consent Message"]').contentFrame().getByRole('button', { name: 'Accepteren', exact: true }).click();
    await page.getByRole('link', { name: 'inloggen' }).click();
    await page.getByRole('textbox', { name: 'E-mailadres' }).fill(newTestUserCredentials.email);
    await page.getByRole('textbox', { name: 'Wachtwoord' }).fill(newTestUserCredentials.password);
    await page.getByRole('button', { name: 'Inloggen met je e-mailadres' }).click();
    await page.waitForTimeout(1000);
  
    await page.context().storageState({ path: '.auth/authState.json' });
  })

})

