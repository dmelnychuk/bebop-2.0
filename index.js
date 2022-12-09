console.log("hello world")

const puppeteer = require ('puppeteer');
const fs = require('fs/promises');
const translate = require('./translate');
const getImage = require('./image');
const getPage = require('./page');
const getLinks = require('./getlinks');
let oneTimeURL = ('https://cointelegraph.com/news/ethereum-developers-target-march-2023-for-shanghai-hard-fork')



getLinks()

getPage(oneTimeURL)
.then (res => {translate(res)})
getImage(oneTimeURL)