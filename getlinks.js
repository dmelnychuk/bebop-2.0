const puppeteer = require ('puppeteer');
const fs = require('fs/promises');


async function getLinks(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://cointelegraph.com')

    // Making screenshot inside chromium
    // await page.screenshot({ path: "amazing1.png", fullPage: true })
   

    // Catching selectors inside headless chromium browser and making array of them
    // const titles = await page.evaluate(() => {
    //    return Array.from(document.querySelectorAll(".post-card__title-link")).map(t => t.textContent) //this performs in headless chromium

    // })
    // //writing catched selectors in titles file
    // await fs.writeFile("titles.txt", titles.join("\r\n"))
//----------------------------------------------------------------

 // Wait for the results page to load and display the results.
 const resultsSelector = 'a[href*="/news/"]';
 await page.waitForSelector(resultsSelector);

 // Extract the results from the page.
 const links = await page.evaluate(resultsSelector => {
   return [...document.querySelectorAll(resultsSelector)].map
   (anchor => {
    //  const title = anchor.textContent.split('|')[0].trim();
    //  return `${title} - ${anchor.href}`;
     return `${anchor.href}`;
   });
 }, resultsSelector);

 //Createing array of links
 const iterLinks = Array.from(links);
 //Making new array of unique links
 const uniqueLinks = [...new Set(iterLinks)]
 
 // Print all the files.
 console.log(links.join('\n'));
 console.log(typeof(links));
 console.log(uniqueLinks);
//  await fs.writeFile("links.txt", links.join("\r\n"))

// await page.goto('')
// const postSelector = 'post-content'

//----------------------------------------------------------------

    await browser.close()

}

//getLinks()

module.exports = getLinks;

   