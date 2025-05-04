import { Browser, chromium, Page } from '@playwright/test';
import newTestUserCredentials from './data/credentialsMarktplaats';

async function globalSetup() {
  const browser: Browser = await chromium.launch({headless: false});
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto('https://www.marktplaats.nl');

  await page.locator('iframe[title="SP Consent Message"]').contentFrame().getByRole('button', { name: 'Accepteren', exact: true }).click();
  await page.getByRole('link', { name: 'inloggen' }).click();
  await page.getByRole('textbox', { name: 'E-mailadres' }).fill(newTestUserCredentials.email);
  await page.getByRole('textbox', { name: 'Wachtwoord' }).fill(newTestUserCredentials.password);
  await page.getByRole('button', { name: 'Inloggen met je e-mailadres' }).click();
  await page.waitForTimeout(1000);

  await page.context().storageState({ path: '.auth/authState.json' });

  await browser.close();
}

export default globalSetup;