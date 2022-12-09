const puppeteer = require ('puppeteer');
const fs = require('fs/promises');
const translate = require('./translate');
const getImage = require('./image');
let oneTimeURL = 'https://cointelegraph.com/news/ethereum-developers-target-march-2023-for-shanghai-hard-fork'
let readyPost

async function start(oneTimeURL){
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

 console.log(readyPost);


    await browser.close()

return readyPost;

}

///tested running function with translate function, connected from separate module.

start(oneTimeURL)
.then (res => {translate(res)})
//.then (oneTimeURL =>{getImage('https://cointelegraph.com/news/ethereum-developers-target-march-2023-for-shanghai-hard-fork')})
//.then(log => console.log(oneTimeURL))



