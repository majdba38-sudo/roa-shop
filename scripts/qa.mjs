import { chromium } from 'playwright-core'
import fs from 'node:fs'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.BASE_URL || 'http://127.0.0.1:5173/'
fs.mkdirSync('.preview', { recursive: true })

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
})

const errors = []
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
})
const page = await context.newPage()
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
})
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)

const imageReport = await page.evaluate(() => {
  const imgs = [...document.images]
  return imgs.map((img) => ({
    src: img.currentSrc.split('/').slice(-1)[0],
    w: img.naturalWidth,
    h: img.naturalHeight,
    complete: img.complete,
  }))
})

await page.screenshot({ path: '.preview/01-hero-desktop.png' })

for (const n of [1, 2, 3, 4, 5]) {
  await page.locator(`#station-${n}`).scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
  await page.screenshot({ path: `.preview/02-station-${n}.png` })
}

for (const id of ['collection', 'about', 'finale', 'contact']) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)
  await page.screenshot({ path: `.preview/03-${id}.png` })
}

// --- Functional flow ---------------------------------------------------
await page.locator('#station-1').scrollIntoViewIfNeeded()
await page.waitForTimeout(600)

const addButton = page.getByTestId('add-to-cart-jojoba-oil')
await addButton.click()
await page.waitForTimeout(400)
const badgeAfterAdd = (await page.getByTestId('cart-button').innerText()).trim()

await page.getByTestId('cart-button').click()
await page.waitForTimeout(700)
await page.screenshot({ path: '.preview/04-cart-drawer.png' })

// increase quantity in the drawer
await page.locator('aside').getByRole('button', { name: /زيادة|increase/i }).first().click()
await page.waitForTimeout(300)
const drawerQty = await page.locator('aside [aria-live="polite"]').first().innerText()
const drawerSubtotal = await page.locator('aside').innerText()

await page.getByTestId('cart-checkout').click()
await page.waitForTimeout(800)
await page.screenshot({ path: '.preview/05-checkout.png' })

// invalid submit first
await page.getByTestId('checkout-submit').click()
await page.waitForTimeout(400)
const validationErrors = await page.locator('[role="alert"]').count()

await page.locator('input[name="name"]').fill('سارة العتيبي')
await page.locator('input[name="tel"]').fill('0555555555')
await page.locator('input[name="address-level2"]').fill('الرياض')
await page.locator('input[name="address-level3"]').fill('النخيل')
await page.locator('textarea[name="street-address"]').fill('شارع الأمير محمد، مبنى 12، شقة 4')
await page.locator('textarea[name="notes"]').fill('يرجى التواصل قبل التوصيل')

const popupPromise = context.waitForEvent('page', { timeout: 8000 }).catch(() => null)
await page.getByTestId('checkout-submit').click()
const popup = await popupPromise
const whatsappUrl = popup ? popup.url() : null
await page.waitForTimeout(900)
const successText = await page.locator('#checkout-title').innerText()
const successRef = await page.locator('[data-testid="whatsapp-link"]').getAttribute('href')
await page.screenshot({ path: '.preview/06-checkout-success.png' })
if (popup) await popup.close().catch(() => {})

// reload persistence
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(800)
const persistedBadge = (await page.getByTestId('cart-button').innerText()).trim()

// --- English LTR -------------------------------------------------------
await page.getByTestId('lang-toggle').click()
await page.waitForTimeout(900)
const english = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  dir: document.documentElement.dir,
  h1: document.querySelector('h1')?.innerText.replace(/\n+/g, ' | '),
}))
await page.screenshot({ path: '.preview/07-hero-english.png' })

// --- Mobile ------------------------------------------------------------
await page.setViewportSize({ width: 390, height: 844 })
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(800)
await page.screenshot({ path: '.preview/08-mobile-hero.png' })
await page.getByTestId('menu-toggle').click()
await page.waitForTimeout(600)
await page.screenshot({ path: '.preview/09-mobile-menu.png' })
await page.getByTestId('menu-toggle').click()

const mobileOverflow = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
}))

// --- Reduced motion ----------------------------------------------------
const rmContext = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
})
const rmPage = await rmContext.newPage()
await rmPage.goto(BASE, { waitUntil: 'networkidle' })
await rmPage.waitForTimeout(900)
const rmH1Opacity = await rmPage.locator('h1').evaluate((el) => getComputedStyle(el).opacity)
await rmPage.screenshot({ path: '.preview/10-reduced-motion.png' })
await rmContext.close()

const metrics = await page.evaluate(() => ({
  width: innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  height: document.documentElement.scrollHeight,
  stations: [...document.querySelectorAll('[data-station]')].map((el) => el.id),
  logo: document.querySelector('header img')?.currentSrc.split('/').slice(-1)[0],
}))

console.log(
  JSON.stringify(
    {
      imageReport,
      badgeAfterAdd,
      drawerQty,
      drawerSubtotalTail: drawerSubtotal.slice(-220),
      validationErrors,
      whatsappUrl,
      successText,
      successRef,
      persistedBadge,
      english,
      mobileOverflow,
      rmH1Opacity,
      metrics,
      errors,
    },
    null,
    2,
  ),
)

await browser.close()
