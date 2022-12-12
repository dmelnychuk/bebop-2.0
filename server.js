const port = 8383;
const express = require('express');
const getLinks = require('./getlinks');
const getPage = require('./page');
const cors = require('cors')
const app = express() 
app.use(cors())
let article = []


app.get('/', (req, res) => {
    res.json('This is a server page')
})


getLinks()
.then (ulinks => {
    for (let i = 0; i < 3; i++) {
        getPage(ulinks[i]) // returns article per each URL
        .then (res => {article.push({res})})
        .then (res => {
          app.get('/results', (request, result) => {result.json(article)})
          
        })
        //
        //.then (res => {console.log(res)})// translate each article
    }
})

app.listen(port, () => {console.log(`Server has started on port: ${port}`)})
