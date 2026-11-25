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
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
})
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(2200)

const heroOpacity = await page.locator('h1').evaluate((el) => getComputedStyle(el).opacity)
await page.screenshot({ path: '.preview/01-hero-desktop.png' })

await page.locator('#station-1').scrollIntoViewIfNeeded()
await page.waitForTimeout(1200)
await page.screenshot({ path: '.preview/02-station-jojoba.png' })

await page.locator('#collection').scrollIntoViewIfNeeded()
await page.waitForTimeout(1200)
await page.screenshot({ path: '.preview/03-collection.png' })

await page.locator('#about').scrollIntoViewIfNeeded()
await page.waitForTimeout(1000)
await page.screenshot({ path: '.preview/04-about.png' })

await page.locator('#finale').scrollIntoViewIfNeeded()
await page.waitForTimeout(1200)
await page.screenshot({ path: '.preview/05-finale.png' })

await page.locator('#contact').scrollIntoViewIfNeeded()
await page.waitForTimeout(800)
await page.screenshot({ path: '.preview/06-contact.png' })

// trigger lazy backgrounds, then capture a full page overview
for (const selector of ['#station-2', '#station-3', '#station-4', '#station-5', '#collection']) {
  await page.locator(selector).scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
}
await page.screenshot({ path: '.preview/07-full.png', fullPage: true })

const metrics = await page.evaluate(() => ({
  width: innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  height: document.documentElement.scrollHeight,
  h1: document.querySelector('h1')?.innerText,
  cartBadge: document.querySelector('[data-testid="cart-button"]')?.innerText,
  stationCount: document.querySelectorAll('[data-station]').length,
  products: [...document.querySelectorAll('[data-station]')].map((el) => el.id),
}))

console.log(JSON.stringify({ heroOpacity, metrics, errors }, null, 2))
await browser.close()
