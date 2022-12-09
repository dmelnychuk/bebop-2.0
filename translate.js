var https = require("follow-redirects").https;
var fs = require("fs");

function translate(postText) {
  // let postText = "I have never been to London, Rome, «Paris»"
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
      // var translatedPost = receivedPost.data
      // var newPost = translatedPost
      // var splitPost = receivedPost.data.map(x => ({
      //     translated: x.translated,
      // }));

      // defining exact element that we want to get from array of arrays
      var splitPost = receivedPost.data[0].translated;

      console.log(splitPost);
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

/// need to return value which can be used for further actions.

}

module.exports = translate;

