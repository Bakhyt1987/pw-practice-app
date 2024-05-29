import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test('Extracting values', async({page})=>{
    //single test value
    const basicform = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicform.locator('button').textContent()
    expect(buttonText).toEqual('Submit')
    
    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    //input value
    const emailfield = basicform.getByRole("textbox", { name: "Email" })
    await emailfield.fill("test@test.com")
    const emailValue =  await emailfield.inputValue()
    expect(emailValue).toEqual("test@test.com")

    const placeHolderValue = await emailfield.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email')

})

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card')
    .filter({hasText: "Basic form"}).locator('button')

    //Generals Assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //Locator Assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})