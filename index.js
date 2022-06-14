/* eslint-disable no-restricted-syntax */
const puppeteer = require('puppeteer');

(async () => {
  // Start browser option headless
  const browser = await puppeteer.launch({
    headless: true,
  });
  // Start new page
  const page = await browser.newPage();
  // Url website
  await page.goto('https://www.imdb.com/movies-coming-soon/2022-07');

  // Check on page
  const movies = await page.evaluate(() => {
    const moviesArray = [];
    // Select element, CSS selector
    const elements = document.querySelectorAll('div.list_item');
    // Loop to get elements
    // eslint-disable-next-line no-undef
    for (element of elements) {
      moviesArray.push({
        title: element.querySelector('td.overview-top a')?.textContent.trim(),
        img: element.querySelector('img.poster')?.src,
        resume: element.querySelector('div.outline').textContent.trim(),

      });
    }
    return moviesArray;
  });
  console.log(movies);
  await browser.close();
})();
