import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly listViewButton: Locator;
  readonly cardViewButton: Locator;
  readonly resultTitles: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByRole('combobox', { name: 'Dropdown zoekbalk' });
    this.searchButton = page.getByRole('button', { name: 'Zoek' });

    // Кнопки перемикання вигляду (залежать від aria-label)
    this.listViewButton = page.locator('[aria-label="Lijstweergave"]');
    this.cardViewButton = page.locator('[aria-label="Galerijweergave"]');

    // Заголовки обʼєктів
    this.resultTitles = page.locator('[data-testid="listing-title"]');
  }

  /**
   * Navigate to the Marktplaats map page.
   * This method is used to access the map view of the website.
   */
  async gotoMarktplaatsMap() {
    await this.page.goto('https://www.marktplaats.nl/map/kijkinjewijk/');
  }

  async performSearch(keyword: string) {
    // await this.searchInput.fill(keyword);
    // await this.searchInput.press('Enter'); // на Marktplaats це тригер пошуку
    //const mapMarkers = await this.page.locator('div[style*="position: absolute"][style*="top"][style*="left"]').elementHandles();

    const markers = this.page.locator('div[class*="marker"], div[style*="z-index"] >> text=/^\\d+$/');

    // Перевіримо, що є хоч один
    await expect(markers.first()).toBeVisible();

    // Отримаємо текст (число) першого маркера
    const value = await markers.first().textContent();
    console.log(`📍 Знайдений кластер з числом: ${value}`);


    // Клік по цьому маркеру
    // await markers.first().click();
    value && await this.page.getByText(value.toString()).click();

    const rightPanel = await this.page.locator('.Sidebar-container ').all();
    console.log(`📍 rightPanel: ${rightPanel.length}`);


    // if (mapMarkers.length > 0) {
    //   await mapMarkers[0].click();
    //   console.log(`📌 Клікнули на маркер: ${mapMarkers[0]}`);
    //   await this.page.waitForTimeout(1000); // почекати 1 сек для стабільності
      
    //   // Дочекайся появи попапу з інфою
    //   const popup = this.page.locator('[data-testid="listing-title"]');
    //   console.log(`📌 popup: ${await popup}`);
    //   await expect(popup).toBeVisible();
    
    //   const title = await popup.first().textContent();
    //   console.log(`📌 Назва об'єкта з карти: ${title?.trim()}`);
    // }
  }

  async switchToListView() {
    await this.listViewButton.click();
  }

  async switchToCardView() {
    await this.cardViewButton.click();
  }

  async getFirstResultTitle(): Promise<string> {
    return (await this.resultTitles.first().textContent())?.trim() || '';
  }

  async expectSameFirstResultInBothViews() {
    await this.switchToListView();
    await this.page.waitForTimeout(500); // почекати на DOM
    const listTitle = await this.getFirstResultTitle();

    await this.switchToCardView();
    await this.page.waitForTimeout(500);
    const cardTitle = await this.getFirstResultTitle();

    expect(cardTitle).toContain(listTitle); // допуск на форматування/довжину
  }
}
