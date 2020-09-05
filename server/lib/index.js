const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const apicache = require("apicache");
const moment = require("moment");
const { join } = require("path");
const models = require("./models");
const jdenticon = require("jdenticon");

const scraper = require("./scraper");

require("dotenv").config();

const app = express();

const env = process.env.NODE_ENV;

jdenticon.configure({
  hues: [6],
  lightness: {
    color: [0.33, 0.89],
    grayscale: [0.34, 0.68],
  },
  saturation: {
    color: 0.8,
    grayscale: 0.19,
  },
  backColor: "#0000",
});

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(
  apicache.options({ enabled: env !== "development" }).middleware("10 minutes")
);

const endpoints = [
  "assocHistory",
  "assoc",
  "league",
  "team",
  "club",
  "clubPreview",
  "game",
  "player",
  "elo",
  "me",
];

endpoints.forEach((path) => {
  app.get(`/${path}`, async (req, res) => {
    const query = {
      ...req.query,
      url:
        req.query.url &&
        join("/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/", req.query.url),
    };
    try {
      query.format === "ics"
        ? scraper[path](query, res)
        : res.json(await scraper[path](query));
    } catch (e) {
      console.error(e);
    }
  });
});

app.get("/club/:id", async ({ params }, res) => {
  try {
    res.json(await scraper.club(params.id));
  } catch (e) {
    console.error(e);
  }
});

app.get("/club-teams/:id", async ({ params }, res) => {
  try {
    res.json(await scraper.clubTeams(params.id));
  } catch (e) {
    console.error(e);
  }
});

app.get("/search/:term", async ({ params }, res) => {
  try {
    res.json(await scraper.search(params.term));
  } catch (e) {
    console.error(e);
  }
});

app.get("/regionSchedule", async ({ query }, res) => {
  try {
    res.json(
      await scraper.regionSchedule({
        championship: query.championship,
        date: moment(query.date),
      })
    );
  } catch (e) {
    console.error(e);
  }
});

app.get("/logo/:id?", async ({ params, query }, res) => {
  try {
    const club = await models.Club.forge(
      params.id ? { id: parseInt(params.id) } : { name: query.name }
    ).fetch();
    res.sendFile(club.get("logo"), { root: join(__dirname, "../logos") });
  } catch (e) {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
    });
    res.end(jdenticon.toSvg(params.id || query.name, 200));
  }
});

const port = process.env.PORT || 3020;

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
