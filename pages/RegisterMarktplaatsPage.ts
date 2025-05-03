import { Page, Locator, FrameLocator , expect } from '@playwright/test';
import { newTestUserCredentials } from '../data/credentialsMarktplaats';

type User = typeof newTestUserCredentials;

export default class RegisterMarktplaatsPage {
  readonly page: Page;
  readonly iframeLocator: FrameLocator;
  readonly loginLink: Locator;
  readonly createAccountLink: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // navigation
    this.loginLink = page.getByRole('link', { name: 'inloggen' });
    this.createAccountLink = page.getByRole('link', { name: 'Account aanmaken' });

    this.nameInput = page.getByRole('textbox', { name: 'Je naam op Marktplaats' });
    this.emailInput = page.getByRole('textbox', { name: 'E-mailadres' });
    this.passwordInput = page.getByRole('textbox', {
      name: 'Nieuw wachtwoord',
      exact: true,
    });
    this.repeatPasswordInput = page.getByRole('textbox', {
      name: 'Herhaal nieuw wachtwoord (ter controle)',
    });

    this.submitButton = page.getByRole('button', { name: 'Maak account aan' });
  }

  async navigateToRegistrationPage() {
    await this.loginLink.click();
    await this.createAccountLink.click();
  }

  async populateRegistrationForm(user: User) {
    await this.nameInput.fill(user.fullName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.password);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async expectSuccessfulRegistration() {
    await expect(this.page.getByText('Account met succes aangemaakt')).toBeVisible();
  }
}
