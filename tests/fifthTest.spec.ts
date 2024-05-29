import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test('Reusing the locators', async({page})=>{
    const basicform = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicform.getByRole("textbox", { name: "Email" })
    const passwordField = basicform.getByRole("textbox", { name: "Password" })
    
    await emailField.fill('test@test.com')
    await passwordField.fill('Welcome123')
    await basicform.locator('nb-checkbox').click()
    await basicform.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})