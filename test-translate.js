const http = require('http');
const port = 8383;
const https = require("follow-redirects").https;
const puppeteer = require ('puppeteer');
const fs = require('fs/promises');
const express = require('express')
let oneTimeURL = 'https://cointelegraph.com/news/gamestop-to-drop-crypto-efforts-as-q3-losses-near-95m'
let readyPost
let TN = (`My test result`)
let resArray = []
let postText = "My best Post text"
let article = []
const app = express() 
const cors = require('cors')
app.use(cors())

//translate(postText)
//getPage(oneTimeURL)
getLinks()
.then (ulinks => {
    for (let i = 0; i < 3; i++) {
        getPage(ulinks[i]) // returns article per each URL
        .then (res => {article.push({res})})
        .then (res => {
          app.get('/results', (request, result) => {result.json(article)})
          
        })
        //.then (res => {console.log(resArray)})
        //.then (res => {console.log(res)})// translate each article
    }
})

app.listen(port, () => {console.log(`Server has started on port: ${port}`)})


//<------URL Extracting ---->
async function getLinks(){
    console.log('Extracting links...')
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('https://cointelegraph.com')
  
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
  
      await browser.close()
      console.log(`Links extracted: ${uniqueLinks.length} `)
      return uniqueLinks
  }

//<-------Page Processing----->
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
  return readyPost;
  }

//<!----Translation---->
 function translate(postText) {
  console.log (`Page translation started...`)
  var options = {
    method: "POST",
    hostname: "script.google.com",
    path: "/macros/s/AKfycbxaVydkWWHjyytFU3Tlomsb1_VjTZJQYq57u0iBXLOokMDsJr_KSqldRFbOyVQzv2ka/exec",
    headers: {
      "Content-Type": "application/json",
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      //making an object from a JSON  string
      var receivedPost = JSON.parse(body.toString());

      // defining exact element that we want to get from array of arrays
      var splitPost = receivedPost.data[0].translated;
      console.log (`Page translation finished`)

      // resArray.push(splitPost)
      // console.log(resArray)
      /// returns value which can be used for further actions.

     

    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    data: [
      {
        original: `${postText}`,
      },
    ],
    from: "EN",
    to: "UK",
  });

  req.write(postData);

  req.end();
  
  return splitPost

}


