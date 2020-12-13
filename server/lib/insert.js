const models = require("./models");

const data = {
  aarberg: "aarberg.png",
  bern: "bern.png",
  brügg: "bruegg.png",
  bulle: "bulle.jpeg",
  burgdorf: "burgdorf.jpg",
  düdingen: "duedingen.png",
  grauholz: "grauholz.png",
  grossaffoltern: "grossaffoltern.png",
  köniz: "koeniz.png",
  "zz-lancy": "lancy.jpg",
  langnau: "langnau.png",
  lyss: "lyss.png",
  meyrin: "meyrin.jpeg",
  münchenbuchsee: "muenchenbuchsee.png",
  "rio-star muttenz": "muttenz.png",
  neuhausen: "neuhausen.png",
  niederscherli: "niederscherli.png",
  port: "port.jpg",
  schwarzenburg: "schwarzenburg.png",
  solothurn: "solothurn.png",
  steffisburg: "steffisburg.jpg",
  stettlen: "stettlen.jpg",
  thörishaus: "thoerishaus.jpg",
  thun: "thun.svg",
  veyrier: "veyrier.png",
  wädenswil: "wädenswil.png",
  "wil sg": "wil.png",
  wohlensee: "wohlensee.png",
};

Object.entries(data).forEach(async ([name, logo]) => {
  try {
    const match = await models.Club.where({ name }).fetch();
    match.save({ logo });
  } catch (e) {
    console.log("did not find club: " + name);
  }
});

console.log("done");
