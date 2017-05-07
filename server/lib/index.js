const express = require("express");

const scraper = require("./scraper");
const db = require("./db");

var app = express();

app.use((req, res, next) => {
    const client = process.env.NODE_ENV === 'production'
      ? 'https://tt.zosel.ch'
      : 'http://localhost:8100';
    res.setHeader('Access-Control-Allow-Origin', client);
    next();
});

const endpoints = {
  assoc: 'getAssociation',
  league: 'getLeague',
  club: 'getClub',
  game: 'getGame',
  player: 'getPlayer'
}

Object.keys(endpoints).forEach(path => {
  app.get(`/${path}`, async (req, res) => {
    const method = endpoints[path];
    try {
      res.json(await scraper[method](req.query.url));
    } catch(e) {
      res.status(404).send('Not found');
    }
  });
});

async function scrape() {
  console.time("scrape");
  db.replace(await scraper.getStaticData());
  console.timeEnd("scrape");
}

app.listen(3020, function() {
  console.log("server listening on port 3020");
});
//scrape();
// test();
