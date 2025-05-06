import { test, expect } from '@playwright/test';
import { before } from 'node:test';

test.beforeEach(async ({page}) => {
  await page.goto('https://www.crowdfinder.be/');
})

test('Board Game page', async ({ page }) => {
  await page.locator('.navbar-light').getByRole('link', {name: 'Board games'}).click()
});

test('Create New User / UI', async ({ page }) => {

  await page.getByRole('link', { name: 'Register' }).click();

  await page.getByRole('textbox', { name: 'First name' }).fill('Oleks');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Nowak');
  await page.getByRole('textbox', { name: 'E-mail address' }).fill('o.nl@gmail.com');

  await page.locator('input[name="password"]').fill('24ScorcH');
  await page.locator('input[name="repeatpassword"]').fill('24ScorcH');
  

  const cityInput = page.locator('#__BVID__232');
  await cityInput.pressSequentially('Amsterdam');
  await page.locator('.autocomplete').getByText('Amsterdam').click();

  await page.locator('label[for="disclaimer"]').check();
  await page.locator('label[for="data"]').check();  

  await page.getByRole('button', { name: 'Register' }).click();
});

// test('Login / UI', async ({ page }) => {
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.getByRole('textbox', { name: 'E-mail address' }).fill('


// test('Create New User / API', async ({ page }) => {
//   const response = await page.request.post('https://www.crowdfinder.be/api/v1/user/register', {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: {"firstname":"Oleks","lastname":"Nowak","email":"hoool.nl@gmail.com","password":"24ScorcH","repeatpassword":"24ScorcH","city":"Amsterdam","country":"nl","lat":52.3730796,"lng":4.8924534,"disclaimer":true,"data":true,"language":"en"}
//   });
//   const responseBody = await response.json();
//   expect(responseBody).toEqual({
//     "status": "success",
//     "message": "User created successfully",
//     "data": {
//       "id": 123456,
//       "firstname": "Oleks",
//       "lastname": "Nowak",
//       "email": "hoool.nl@gmail.com",
//       "city": "Amsterdam",
//       "country": "nl",
//       "lat": 52.3730796,
//       "lng": 4.8924534,
//       "disclaimer": true,
//       "data": true,
//       "language": "en"
//     }
//   });
//   expect(response.status()).toBe(200);
//   expect(responseBody.status).toBe('success');
//   expect(responseBody.message).toBe('User created successfully');
//   expect(responseBody.data.firstname).toBe('Oleks');
//   expect(responseBody.data.lastname).toBe('Nowak');
//   expect(responseBody.data.email).toBe('hoool.nl@gmail.com');
//   expect(responseBody.data.city).toBe('Amsterdam');
//   expect(responseBody.data.country).toBe('nl');
//   expect(responseBody.data.lat).toBe(52.3730796);
//   expect(responseBody.data.lng).toBe(4.8924534);
//   expect(responseBody.data.disclaimer).toBe(true);
// });

