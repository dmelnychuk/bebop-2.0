const fs = require("fs");
const puppeteer = require("puppeteer");

//"https://cointelegraph.com/news/gbtc-elevator-to-hell-sees-bitcoin-spot-price-approach-100-premium";


function getImage(gotoURL) {

(async () => {
  try {
    // Initialize Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

//load page of a news
    

    await page.goto(gotoURL);
    console.log("page has been loaded!");

 
//Get URL of post-cover image
    const imageSelector = "div.post-cover.post__block > div > div > picture > img";
    await page.waitForSelector(imageSelector)
    const imgURL = await page.$eval(imageSelector, el => el.src); //, imgs => imgs.src
console.log(`Here is image: ${imgURL}`);


///save image 
var viewImage = await page.goto(imgURL);
fs.writeFile("coinimage.jpg", await viewImage.buffer(), function (err) {
  if (err) {
      return console.log(err);
  }

  console.log("The file was saved!")});
 
    // console.log("File is created!");

    // End Puppeteer
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();

}


getImage("https://cointelegraph.com/news/us-lawmakers-question-federal-regulators-on-banks-ties-to-crypto-firms")

module.exports = getImage;
