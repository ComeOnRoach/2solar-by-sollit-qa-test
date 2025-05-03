import { Page, Locator } from "playwright/test";

class LoginToMarktplaatsPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;


  constructor(page: Page) {
    this.page = page;
    const loginLink = page.getByRole("link", { name: "inloggen" });
    const emailInput = page.getByRole("textbox", { name: "E-mailadres" });
    const passwordInput = page.getByRole("textbox", { name: "Wachtwoord" });
    const submitButton = page.getByRole("button", { name: "Inloggen" });
  }

  async login(email: string, password: string) {
    await this.page.goto("https://www.marktplaats.nl");
    await this.loginLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}