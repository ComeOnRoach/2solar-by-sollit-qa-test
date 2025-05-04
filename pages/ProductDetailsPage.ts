import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly advertentieNummerElement: Locator;

  constructor(private page: Page) {
    this.advertentieNummerElement = page.getByText('Advertentienummer:');
  }

  async getAdvertentieNummer(): Promise<string> {
    await this.advertentieNummerElement.scrollIntoViewIfNeeded();
    await expect(this.advertentieNummerElement).toBeVisible();
    return (await this.advertentieNummerElement.textContent())?.trim() || '';
  }

  async assertMatchWith(expected: string) {
    const actual = await this.getAdvertentieNummer();
    expect(actual).toEqual(expected);
  }
}
