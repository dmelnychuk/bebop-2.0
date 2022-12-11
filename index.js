console.log("Starting index...")

const puppeteer = require ('puppeteer');
const https = require("follow-redirects").https;
const fs = require('fs/promises');
const translate = require('./translate');
const getImage = require('./image');
const getPage = require('./page');
const getLinks = require('./getlinks');
let oneTimeURL = ('https://cointelegraph.com/news/ethereum-developers-target-march-2023-for-shanghai-hard-fork')



getLinks()
.then (ulinks => {
    for (let i = 0; i < 3; i++) {
        getPage(ulinks[i]) // returns article per each URL
        .then (res => {translate(res)})// translate each article
    }
})



