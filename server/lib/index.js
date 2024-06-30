const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const apicache = require("apicache");
const moment = require("moment");
const multer = require("multer");
const { join } = require("path");
const models = require("./models");
const jdenticon = require("jdenticon");
const sharp = require("sharp");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const { createProxyMiddleware } = require("http-proxy-middleware");

const prisma = new PrismaClient();

const scraper = require("./scraper");

const upload = multer({ dest: "logos/" });

require("dotenv").config({ path: "../.env" });

const app = express();

const env = process.env.NODE_ENV;
const UPLOAD_PASSWORD = process.env.UPLOAD_PASSWORD;

if (!UPLOAD_PASSWORD) {
  throw "UPLOAD_PASSWORD env variable is missing";
}

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
  app.get(`/${path}`, async (req, res, next) => {
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
      next(e);
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
    res.json(await scraper.clubTeams(parseInt(params.id)));
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
    if (!club.get("logo")) {
      throw "no logo found";
    }
    res.sendFile(club.get("logo"), { root: join(__dirname, "../logos") });
  } catch (e) {
    res
      .set("Content-Type", "image/svg+xml")
      .status(200)
      .send(jdenticon.toSvg(params.id || query.name, 200));
  }
});

app.post("/upload", upload.single("logo"), async function (req, res, next) {
  let { password, id } = req.body;
  id = parseInt(id);
  if (password != process.env.UPLOAD_PASSWORD) {
    res.sendStatus(401);
    return;
  }

  const { filename: image } = req.file;

  const buffer = await sharp(req.file.path)
    .resize(200, 200, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  sharp(buffer).toFile(`logos/${id}.png`);
  fs.unlinkSync(req.file.path);

  const logo = `${id}.png`;
  await models.Club.forge({ id, logo }).save();
  await prisma.club.update({
    where: { id },
    data: { logo },
  });

  res.sendStatus(200);
});

const port = process.env.PORT || 3020;
// custom error handler to send errors as plain text (no HTML)
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err);
});
app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
