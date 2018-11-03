const compression = require('compression')
const express = require('express')
const cors = require('cors')
const { join } = require('path')

const scraper = require('./scraper')

const app = express()

app.use(compression())
app.use(cors())

const endpoints = [
  'assocHistory',
  'assoc',
  'league',
  'team',
  'club',
  'game',
  'player',
  'elo',
  'me'
]

endpoints.forEach(path => {
  app.get(`/${path}`, async (req, res) => {
    const query = {
      ...req.query,
      url:
        req.query.url &&
        join('/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/', req.query.url)
    }
    try {
      query.format === 'ics'
        ? scraper[path](query, res)
        : res.json(await scraper[path](query))
    } catch (e) {
      console.error(e)
    }
  })
})

app.get('/club/:id', async ({ params }, res) => {
  try {
    res.json(await scraper.club(params.id))
  } catch (e) {
    console.error(e)
  }
})

app.get('/club-teams/:id', async ({ params }, res) => {
  try {
    res.json(await scraper.clubTeams(params.id))
  } catch (e) {
    console.error(e)
  }
})

app.listen(3020, function() {
  console.log('server listening on port 3020')
})
