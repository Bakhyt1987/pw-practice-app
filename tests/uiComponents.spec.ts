import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})


test.describe('UI Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input fields', async ({ page }) => {
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" })

    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 })

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
  })

  test('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

    //await usingTheGridForm.getByLabel('Option 1').check({ force: true })
    await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })

    const radioStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()
    expect(radioStatus).toBeTruthy()

    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()

    await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
    expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
    expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()

  })
})

test('Checkboxes', async ({ page }) => {
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
  await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

  const allCheckedBoxes = page.getByRole('checkbox')
  for (const box of await allCheckedBoxes.all()) {
    await box.check({ force: true })
    expect(await box.isChecked()).toBeTruthy()
  }

  const allUncheckedBoxes = page.getByRole('checkbox')
  for (const box of await allUncheckedBoxes.all()) {
    await box.uncheck({ force: true })
    expect(await box.isChecked()).toBeFalsy()
  }



})