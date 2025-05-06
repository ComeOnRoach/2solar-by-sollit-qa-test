    import { test, expect } from '@playwright/test';
    import { MapSearchPage } from '../pages/MapSearchPage';
    import { MapViewPage } from '../pages/MapViewPage';
    import { ListingPanel } from '../pages/ListingPanel';
    import { ListingDetailsPage } from '../pages/ListingDetailsPage';
    import searchData from '../data/search-inputs.json';

    test.describe('Test 2: Marktplaats map functionality', () => {
    test('should load the map page', async ({ page }) => {
        const mapSearch = new MapSearchPage(page);
        await mapSearch.goto();
        await expect(page).toHaveURL(/kijkinjewijk/);
    });

    test('should allow searching with postcode, distance and category', async ({ page }) => {
        const mapSearch = new MapSearchPage(page);
        await mapSearch.goto();

        await mapSearch.search(searchData);
        await expect(page.locator('[data-testid="marker"]').first()).toBeVisible({ timeout: 5000 });
    });

    test('should click random marker and show listings in sidebar', async ({ page }) => {
        const mapSearch = new MapSearchPage(page);
        const mapView = new MapViewPage(page);
        const listings = new ListingPanel(page);

        await mapSearch.goto();
        await mapSearch.search(searchData);

        const expectedSidebarCount = await mapView.clickRandomMarker();
        const { items, count } = await listings.getListings();

        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThanOrEqual(expectedSidebarCount);
    });

    test('should verify listing details match sidebar content', async ({ page }) => {
        const mapSearch = new MapSearchPage(page);
        const mapView = new MapViewPage(page);
        const listings = new ListingPanel(page);
    
        await mapSearch.goto();
        await mapSearch.search(searchData);
    
        await mapView.clickRandomMarker();
        const { text: listingText, popup } = await listings.clickLastListing();
    
        const detail = new ListingDetailsPage(await popup);
        await detail.assertLocation(searchData.city);
    
        const title = await detail.getTitle();
        expect.soft(listingText).toContain(title);
    
        const price = await detail.getPriceValue();
        if (price !== null) {
        expect.soft(listingText).toContain(price.toString());
        }
    
        const category = await detail.getCategoryText();
        const selectedCategory = await page.getByLabel('Kies categorie:').textContent();
        expect.soft(selectedCategory).toContain(category);
    });
    
    });
