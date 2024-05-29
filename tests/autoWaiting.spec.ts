import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax/");
  await page.getByText("Button Triggering AJAX Request").click();

});

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    await successButton.click()

    // const text = await successButton.textContent()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    // await successButton.waitFor({state: "attached"})
    // const text1 = await successButton.allTextContents()

    // expect(text1).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.')

})

test('alternative waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    // __wait for element
    //await page.waitForSelector('.bg-success')

    // __wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // __wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()

    expect(text).toContain('Data loaded with AJAX get request.')
})