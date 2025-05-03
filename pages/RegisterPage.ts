import { Page, Locator, expect } from '@playwright/test';
import { newTestUserCredentialsCrowdfinder } from '../data/credentials';

type User = typeof newTestUserCredentialsCrowdfinder;

export default class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly repeatPassword: Locator;
  readonly cityInput: Locator;
  readonly citySuggestion: Locator;
  readonly disclaimerCheckbox: Locator;
  readonly dataCheckbox: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByRole('textbox', { name: 'First name' });
    this.lastName = page.getByRole('textbox', { name: 'Last name' });
    this.email = page.getByRole('textbox', { name: 'E-mail address' });
    this.password = page.locator('input[name="password"]');
    this.repeatPassword = page.locator('input[name="repeatpassword"]');
    this.cityInput = page.locator('#__BVID__232');
    this.citySuggestion = page.locator('.autocomplete');
    this.disclaimerCheckbox = page.locator('label[for="disclaimer"]');
    this.dataCheckbox = page.locator('label[for="data"]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async populateUserDetails(user: User) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.repeatPassword.fill(user.password);
    await this.cityInput.pressSequentially(user.city);
    await this.citySuggestion.getByText(user.city).click();
  }

  async confirmTermsAndConditions() {
    await this.disclaimerCheckbox.click();
    await this.dataCheckbox.click();
  }

  async submitUserRegistrationForm() {
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.page.getByText(`You are successfully registered`)).toBeVisible();
  }
}