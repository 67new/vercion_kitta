import { test, expect } from '@playwright/test'

test.describe('Quasar Form - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows validation for invalid input', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Your name *' }).fill('')
    await page.getByRole('spinbutton', { name: 'Your age *' }).fill('-5')
    await page.getByRole('checkbox', { name: 'I accept the license and terms' }).check()
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByText('Please type something')).toBeVisible()
    await expect(page.getByText('Please type a real age')).toBeVisible()
  })

  test('submits successfully with valid data', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Your name *' }).fill('Alice Example')
    await page.getByRole('spinbutton', { name: 'Your age *' }).fill('30')
    await page.getByRole('checkbox', { name: 'I accept the license and terms' }).check()
    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.locator('.q-notification')).toContainText('Submitted')
  })

  test('reset clears all fields', async ({ page }) => {
    const name = page.getByRole('textbox', { name: 'Your name *' })
    const age = page.getByRole('spinbutton', { name: 'Your age *' })
    const accept = page.getByRole('checkbox', { name: 'I accept the license and terms' })

    await name.fill('Bob')
    await age.fill('25')
    await accept.check()
    await page.getByRole('button', { name: 'Reset' }).click()

    await expect(name).toHaveValue('')
    await expect(age).toHaveValue('')
    await expect(accept).not.toBeChecked()
  })
})

