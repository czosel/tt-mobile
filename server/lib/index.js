const compression = require('compression')
const express = require('express')
const cors = require('cors')

const scraper = require('./scraper')

const app = express()

app.use(compression())
app.use(cors())

const endpoints = ['assocHistory', 'assoc', 'league', 'club', 'game', 'player']

endpoints.forEach(path => {
  app.get(`/${path}`, async (req, res) => {
    res.json(await scraper[path](req.query))
  })
})

app.listen(3020, function() {
  console.log('server listening on port 3020')
})
