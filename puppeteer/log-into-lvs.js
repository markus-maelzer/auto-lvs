const puppeteer = require('puppeteer');

async function logIntoLVS(user, pw) {
  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  try {
  await page.goto('http://service.bfi-kaernten.at/lvs/');
  await page.focus('#Login1_tbBenutzername');
  await page.keyboard.type(user, {delay: 50});
  await page.focus('#Login1_tbKennwort');
  await page.keyboard.type(pw, {delay: 50});
  await page.waitFor(1000);
  await page.click('#Login1_Button1');
  await page.waitFor(1000);
  await page.click('input[type="submit"]');

  await page.waitFor(2000);
  await browser.close();
  return await { message: `Successfully logged in ${user}` };
  }
  catch(err) {
    // check status: if anwesend do nothing if sth else send email to user >_>
    await browser.close();
    console.log(err);
    throw new Error(err);
  }
}

module.exports = logIntoLVS;
