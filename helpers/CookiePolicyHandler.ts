import { Page, FrameLocator } from '@playwright/test';

export class CookiePolicyHandler {
  private readonly iframe: FrameLocator;

  constructor(page: Page) {
    this.iframe = page.frameLocator('#sp_message_iframe_1278200');
  }

  async acceptCookieConsent() {
    const acceptButton = this.iframe.getByRole('button', { name: 'Accepteren', exact: true });
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
    }
  }
}