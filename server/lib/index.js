const compression = require('compression')
const express = require('express')

const scraper = require('./scraper')
const db = require('./db')

var app = express()

app.use(compression())

app.use((req, res, next) => {
  const client = process.env.NODE_ENV === 'production'
    ? 'https://tt.zosel.ch'
    : 'http://localhost:8100'
  res.setHeader('Access-Control-Allow-Origin', client)
  next()
})

const endpoints = ['associations', 'assoc', 'league', 'club', 'game', 'player']

endpoints.forEach(path => {
  app.get(`/${path}`, async (req, res) => {
    res.json(await scraper[path](req.query.url))
  })
})

async function scrape() {
  console.time('scrape')
  db.replace(await scraper.getStaticData())
  console.timeEnd('scrape')
}

app.listen(3020, function() {
  console.log('server listening on port 3020')
})
