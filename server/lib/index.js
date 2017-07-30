const compression = require('compression')
const express = require('express')

const scraper = require('./scraper')

var app = express()

app.use(compression())

app.use((req, res, next) => {
  const client = process.env.NODE_ENV === 'production'
    ? 'https://tt.zosel.ch'
    : 'http://localhost:8100'
  res.setHeader('Access-Control-Allow-Origin', client)
  next()
})

const endpoints = ['assocHistory', 'assoc', 'league', 'club', 'game', 'player']

endpoints.forEach(path => {
  app.get(`/${path}`, async (req, res) => {
    res.json(await scraper[path](req.query))
  })
})

app.listen(3020, function() {
  console.log('server listening on port 3020')
})
