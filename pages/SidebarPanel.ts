import { Page, Locator, expect } from '@playwright/test';

export class SidebarPanel {
  readonly page: Page;
  readonly panelLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.panelLinks = page.locator('div.Sidebar-container a');
  }

  async waitForLoad() {
    await this.page.waitForSelector('div.Sidebar-container a', { timeout: 10000 });
  }

  async getFirstItemDetails() {
    await this.waitForLoad();
    const first = this.panelLinks.first();
    await first.scrollIntoViewIfNeeded();
    await expect(first).toBeVisible();
    const title = await first.locator('span').innerText();
    const price = await first.locator('strong').innerText();
    return { title: title.trim(), price: price.trim() };
  }

  async openFirstItem(): Promise<Page> {
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.panelLinks.first().click()
    ]);
    return popup;
  }
}
