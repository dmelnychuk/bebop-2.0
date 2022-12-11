const http = require('http');
const port = 8383;
const puppeteer = require ('puppeteer');
const fs = require('fs/promises');
const translate = require('./translate');
const getImage = require('./image');
const getLinks = require('./getlinks');
const getPage = require('./page');
const express = require('express')// adding express
let oneTimeURL = 'https://cointelegraph.com/news/gamestop-to-drop-crypto-efforts-as-q3-losses-near-95m'
let readyPost
let TN = (`My test result`)

const app = express() // express related


app.get('/', (req, res) => {
    res.json('This is my test result')
})


app.get('/results', (req, res) => {
    res.json( getLinks()
    .then (ulinks => {
    for (let i = 0; i < 3; i++) {
        getPage(ulinks[i]) // returns article per each URL
        .then (res => {translate(res)}); // translate each article
    }
})

    )
})

app.listen(port, () => {console.log(`Server has started on port: ${port}`)})
