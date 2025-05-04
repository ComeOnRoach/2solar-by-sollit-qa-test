import { Page, Locator, expect } from '@playwright/test';

export class MapViewPage {
  readonly page: Page;
  readonly clusterMarkers: Locator;

  constructor(page: Page) {
    this.page = page;
    this.clusterMarkers = page.locator('div[class*="marker"], div[style*="z-index"] >> text=/^\\d+$/');
  }

  async goto() {
    await this.page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');
  }

  async clickFirstMarker(): Promise<string> {
    await expect(this.clusterMarkers.first()).toBeVisible({ timeout: 10000 });
    const markerText = await this.clusterMarkers.first().textContent();
    await this.page.getByText(markerText || '', { exact: true }).click();
    return markerText?.trim() || '';
  }
}
