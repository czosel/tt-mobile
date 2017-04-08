const express = require("express");

const scraper = require("./scraper");
const db = require("./db");

var app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    next();
});

app.get("/assoc", async (req, res) => {
  try {
    res.json(await scraper.getAssociation(req.query.url));
  } catch(e) {
    res.status(404).send('Not found');
  }
});

app.get("/league", async (req, res) => {
  try {
    res.json(await scraper.getLeague(req.query.url));
  } catch(e) {
    console.log('error', e);
    res.status(404).send('Not found');
  }
});

app.get("/club", async (req, res) => {
  try {
    res.json(await scraper.getClub(req.query.url));
  } catch(e) {
    res.status(404).send('Not found');
  }
});

app.get("/game", async (req, res) => {
  try {
    res.json(await scraper.getGame(req.query.url));
  } catch(e) {
    res.status(404).send('Not found');
  }
});

async function scrape() {
  console.time("scrape");
  db.replace(await scraper.getStaticData());
  console.timeEnd("scrape");
}

app.listen(3000, function() {
  console.log("server listening on port 3000");
});
//scrape();
// test();
