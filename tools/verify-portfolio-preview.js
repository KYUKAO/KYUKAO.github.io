const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto('http://127.0.0.1:8765/portfolio.html?lang=en', { waitUntil: 'networkidle' });
  await page.waitForSelector('.work-card');
  const cards = await page.locator('.work-card').evaluateAll((items) => items.map((card) => ({
    title: card.querySelector('.work-title')?.textContent,
    image: card.querySelector('.has-image')?.style.backgroundImage || '',
  })));
  console.log(JSON.stringify(cards));
  await page.screenshot({ path: 'C:/Users/ASUS/AppData/Local/Temp/kyukao-portfolio-verified.png', fullPage: true });
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
