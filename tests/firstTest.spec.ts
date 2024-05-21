import { test } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('http://localhost:4200/')
})
  
test.describe('suite 1', ()=> {
  test.beforeEach(async({page})=>{
    await page.getByRole('link', { name: 'Charts', exact: true }).click()
  })
  
  test('navigate to Form Layouts page', async ({page}) => {
    await page.getByRole('link', { name: 'Echarts', exact: true }).click()
  })
})

  test.describe('suite 2', ()=>{
    test.beforeEach(async({page})=>{
      await page.getByText('Forms').click()
    })
    
    test('navigate to Form Layouts page', async ({page}) => {
      await page.getByText('Form Layouts').click()
    })
    
    test('navigate to datepicker page', async ({page}) => {
      await page.getByText('Datepicker').click()
    })
  })