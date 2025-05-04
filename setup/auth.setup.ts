// import { test as setup } from '@playwright/test';
// import { CookiePolicyHandler } from '../helpers/CookiePolicyHandler';
// import { newTestUserCredentials } from '../data/credentialsMarktplaats';

// const authFile = '.auth/authState.json';

// setup("get users login details", async ({page}) => {
//   await page.goto('https://www.marktplaats.nl');

// //   const cookieHandler = new CookiePolicyHandler(page);

// //   await cookieHandler.acceptCookieConsent();

// //   const loginPopUp = page.locator('[class="hz-Card LoginComponent-card"]');

// //   await loginPopUp.getByRole('link', { name: 'inloggen' }).click();
//   await page.locator('#email').fill(newTestUserCredentials.email);
//   await page.locator('#password').fill(newTestUserCredentials.password);
//   await page.locator('[type="button"]').click();
//   await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the login is processed

//   await page.context().storageState({ path: authFile });
// });