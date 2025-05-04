import {expect, test} from "@playwright/test";
import newTestUserCredentials from "../data/credentialsMarktplaats";

test.describe('Login tests', () => {
    test('Login on Marktplaats', async ({ page}) => {
        await page.goto('https://www.marktplaats.nl/'); 
        const logedInUser = await page.getByRole('button', { name: newTestUserCredentials.fullName }).innerText();
        console.log('Logged in user:', logedInUser);
        expect( logedInUser).toContain(newTestUserCredentials.fullName);
      })
    
      test('Login on Marktplaats 2', async ({ page}) => {
        await page.goto('https://www.marktplaats.nl/');
        const logedInUser = page.getByRole('button', { name: newTestUserCredentials.fullName }); 
        await expect(logedInUser).toHaveText(newTestUserCredentials.fullName);
      })
    
      test('Already Logged In to Marktplaats => Mijn Advertenties => Mijn Marktplaats ', async ({ page}) => {
        const mijnMarktplaats = 'Mijn Marktplaats';
        const mijnMarktplaatsPage = page.locator('#page-wrapper').getByText(mijnMarktplaats);
        await page.goto('https://www.marktplaats.nl/');
        await page.getByRole('button', { name: 'Oleksandr' }).click();
        await page.getByRole('link', { name: 'Mijn Advertenties' }).click();
        await expect(mijnMarktplaatsPage).toHaveText(mijnMarktplaats);
      })
})

