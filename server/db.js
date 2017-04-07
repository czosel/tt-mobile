const mongoClient = require("mongodb").MongoClient;

let db = 0;

const url = "mongodb://127.0.0.1:27017/tt";

mongoClient.connect(url, (err, _db) => {
  if (err) {
    throw err;
  }
  db = _db;
});

async function replace(data) {
  const leagues = db.collection("leagues");
  leagues.remove({});
  await leagues.insertMany([data]);
}

module.exports = { replace };
