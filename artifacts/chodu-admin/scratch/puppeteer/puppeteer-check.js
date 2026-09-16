const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  let errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:5175', {waitUntil: 'networkidle0'}).catch(e => console.log('Navigation Error:', e));
  const title = await page.title();
  const content = await page.content();
  console.log('Page title:', title);
  console.log('Body HTML length:', content.length);
  if (errors.length > 0) {
    console.log('ERRORS:', errors.join('\n'));
  } else {
    console.log('No console errors found!');
  }
  await browser.close();
})();
