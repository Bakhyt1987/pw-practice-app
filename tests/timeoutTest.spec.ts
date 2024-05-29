import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax/");
  await page.getByText("Button Triggering AJAX Request").click();
  testInfo.setTimeout(testInfo.timeout + 2000)
});

test('timeouts', async({page})=>{
    test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 16000})
})