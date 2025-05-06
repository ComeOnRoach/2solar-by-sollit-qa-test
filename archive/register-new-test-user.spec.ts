import { test } from '@playwright/test';
import  RegisterPage  from '../pages/RegisterPage';
import { newTestUserCredentialsCrowdfinder } from '../data/credentials';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.crowdfinder.be/'); 
});

test('Create new user account and check login', async ({ page, context }) => {
  const registerPage = new RegisterPage(page);

  await page.getByRole('link', { name: 'Register' }).click();

  await registerPage.populateUserDetails(newTestUserCredentialsCrowdfinder);
  await registerPage.confirmTermsAndConditions();
  await registerPage.submitUserRegistrationForm();

  await registerPage.verifyRegistrationSuccess(); // Check if the user is registered successfully

  await context.storageState({ path: 'state.json' });
});
