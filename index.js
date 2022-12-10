console.log("Starting index...")

const puppeteer = require ('puppeteer');
const fs = require('fs/promises');
const translate = require('./translate');
const getImage = require('./image');
const getPage = require('./page');
const getLinks = require('./getlinks');
let oneTimeURL = ('https://cointelegraph.com/news/ethereum-developers-target-march-2023-for-shanghai-hard-fork')



//let links = getLinks()


//getPage(oneTimeURL)
//.then (res => {translate(res)})
//getImage(oneTimeURL)

// emitter.setMaxListeners() //use to increase limit
getLinks()
.then (ulinks => {
    for (let i = 0; i < 3; i++) {
        getPage(ulinks[i]);
    }
  //links.forEach(ulink => {getPage(ulink)}) //looping through each element of received array of URLs
})

//getPage('https://cointelegraph.com/news/ethereum-developers-target-march-2023-for-shanghai-hard-fork')


