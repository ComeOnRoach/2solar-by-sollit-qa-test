import { test as setup } from '@playwright/test';
import { CookiePolicyHandler } from '../helpers/CookiePolicyHandler';
import { newTestUserCredentials } from '../data/credentialsMarktplaats';

const authFile = '.auth/authState.json';

setup("get users login details", async ({page}) => {
  await page.goto('https://www.marktplaats.nl');

  const cookieHandler = new CookiePolicyHandler(page);

  await cookieHandler.acceptCookieConsent();

  await page.getByRole('link', { name: 'inloggen' }).click();
  await page.getByRole('textbox', { name: 'E-mailadres' }).fill(newTestUserCredentials.email);
  await page.getByRole('textbox', { name: 'Wachtwoord' }).fill(newTestUserCredentials.password);
  await page.getByRole('button', { name: 'Inloggen' }).click();

  await page.context().storageState({ path: authFile });
});
