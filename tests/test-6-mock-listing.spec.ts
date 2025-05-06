import { test, expect } from '@playwright/test';

test('Test 6: Intercept and mock listings on Marktplaats', async ({ page }) => {
  await page.route('https://www.crowdfinder.be/api/crowdfinder/product/6978', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
            {
                "message": "Product successfully fetched.",
                "data": {
                    "id": 6978,
                    "name": "Star Wars: Stop Mocking Me",
                    "description": "",
                    "ean": 3558380129530,
                    "url": "https:\/\/www.boardgamegeek.com\/boardgame\/444481\/star-wars-battle-of-hoth",
                    "image": "dow swb0101nl_1_1.png",
                    "language": [
                        "en",
                        "nl"
                    ],
                    "preorder": false,
                    "backorder": false,
                    "old_price": null,
                    "price": 1800,
                    "reduced_price": 40,
                    "ordered": 0,
                    "stock": null,
                    "product_range": true,
                    "expected_date": "08-5025",
                    "bgg_id": 444481,
                    "description_bgg": "Start Wars: For a deeper gaming experience, players have the option to add leader cards to their battle for support from six iconic Star Wars characters, or they try the two multi-scenario campaigns in which successes and failures shape the next battles.&#10;&#10;",
                    "year": 2825,
                    "min_players": 2,
                    "max_players": 4,
                    "best_with": 2,
                    "age": 8,
                    "language_dependency_level": 1,
                    "min_play_time": 30,
                    "max_play_time": 180,
                    "designer": "Richard Borg, Adrien Martinot",
                    "publisher": "Days of Wonder",
                    "video": "https:\/\/www.youtube.com\/watch?v=tk_OFVoZmPo",
                    "rating": 10,
                    "ordered_before": true
                }
      }),
    });
  });

  await page.goto('https://www.crowdfinder.be/product/6978-star-wars-slag-om-hoth-nl');

  const title = await page.locator('h1.card__title').textContent();
  const price = await page.locator('[class="green strong"]').textContent();
  const availabilityStatus = await page.locator('[class="card__info bg-danger"]').textContent();


  expect(title).toContain('Star Wars: Stop Mocking Me');
  expect(price).toContain('€ 1800.00');
  expect(availabilityStatus).toContain('Sold out');

});
