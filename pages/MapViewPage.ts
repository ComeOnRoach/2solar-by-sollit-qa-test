import { Page, Locator, expect } from '@playwright/test';

export class MapViewPage {
  readonly page: Page;
  readonly clusterMarkers: Locator;
  readonly boundingBoxLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.clusterMarkers = page.locator('div[class*="marker"], div[style*="z-index"] >> text=/^\\d+$/');
    this.boundingBoxLocator = page.locator('div[style="width: 100%; height: 100%; left: 0px; top: 0px; margin: 0px; padding: 0px; position: absolute;"]');
    
  }

  async goto() {
    await this.page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');
  }

  async clickRandomMarker(): Promise<number> {
    const markers = this.page.locator('div[style*="background-color: transparent;"]');
    const count = await markers.count();
    const randomIndex = Math.floor(Math.random() * count);
    const marker = markers.nth(randomIndex);

    const style = await marker.getAttribute("style");
    const left = style ? style.match(/left:\s*(-?[\d.]+)px/) : null;
    const top = style ? style.match(/top:\s*(-?[\d.]+)px/) : null;
  
    if (left && top) {
      const boundingBox = await this.boundingBoxLocator.boundingBox();
      
      const leftX = parseFloat(left[1]);
      const topY = parseFloat(top[1]);
      const x = (boundingBox?.x ?? 0) + leftX + 12;
      const y = (boundingBox?.y ?? 0) + topY + 12;
      await this.page.mouse.move(x, y)
      await this.page.mouse.click(x, y);
    }

    return Number(await marker.innerText());
  }

  async clickFirstMarker(): Promise<string> {
    await expect(this.clusterMarkers.first()).toBeVisible({ timeout: 10000 });
    const markerText = await this.clusterMarkers.first().textContent();
    await this.page.getByText(markerText || '', { exact: true }).click();
    return markerText?.trim() || '';
  }

  async clickFirstMarkerByStyleCoordinates() {
    const markerLocator = this.page.locator('[data-testid="marker"]');
    const markerCount = await markerLocator.count();
  
    for (let i = 0; i < markerCount; i++) {
      const handle = await markerLocator.nth(i).elementHandle();
      const wrapper = await handle?.evaluateHandle(el => el.parentElement);
      const style = await wrapper?.evaluate(el => el?.getAttribute('style') || '');
  
      if (!style) continue;
  
      const left = parseFloat(style.match(/left:\s*(-?\d+(\.\d+)?)px/)?.[1] || '');
      const top = parseFloat(style.match(/top:\s*(-?\d+(\.\d+)?)px/)?.[1] || '');
  
      if (left > 0 && top > 0) {
        console.log(`🖱️ Клік по: x=${left}, y=${top}`);
        await this.page.mouse.move(left, top);
        await this.page.mouse.click(left, top);
        return;
      }
    }
  
  }
}



