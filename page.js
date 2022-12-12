const puppeteer = require ('puppeteer');
const fs = require('fs/promises');
const translate = require('./translate');
const getImage = require('./image');
let oneTimeURL = 'https://cointelegraph.com/news/ethereum-developers-target-march-2023-for-shanghai-hard-fork'
let readyPost

async function getPage(oneTimeURL){
  console.log(`Processing page...`)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(oneTimeURL)

 // Wait for the results page to load and display the results.
 const postSelector = 'div.post-content';
 await page.waitForSelector(postSelector);

 // Extracting post from page 
 const posts = await page.evaluate(postSelector => {
   return [...document.querySelectorAll(postSelector)].map
   (anchor => {
     return `${anchor.innerText}`;
   });
 }, postSelector);

readyPost = posts.join();

    await browser.close()

console.log(`Page [ ${oneTimeURL} ] Processing finished!`)
//console.log(readyPost)

return readyPost;

}

module.exports = getPage;


///tested running function with translate function, connected from separate module.

// oneTimeURL = "https://cointelegraph.com/news/nfts-could-help-solve-diamond-certification-fraud"
// getPage(oneTimeURL)

// .then (res => {translate(res)})
// getImage(oneTimeURL)
//.then(log => console.log(oneTimeURL))



