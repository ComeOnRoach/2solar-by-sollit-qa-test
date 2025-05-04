import { Page, Locator } from "playwright/test";
import userINfo from "../data/credentialsMarktplaats";
import { CookiePolicyHandler } from "../helpers/CookiePolicyHandler";

class LoginToMarktplaatsPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;


  constructor(page: Page) {
    this.page = page; 
    const emailInput = page.getByRole("textbox", { name: "E-mailadres" });
    const passwordInput = page.getByRole("textbox", { name: "Wachtwoord" });
    const submitButton = page.getByRole("button", { name: "Inloggen" });
  }

  async login() {
    await this.page.locator('iframe[title="SP Consent Message"]').contentFrame().getByRole('button', { name: 'Accepteren', exact: true }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('link', { name: 'inloggen' }).click();
    await this.emailInput.fill(userINfo.email);
    await this.passwordInput.fill(userINfo.password);
    await this.submitButton.click();
  }
}

export default LoginToMarktplaatsPage;