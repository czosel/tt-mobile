const config = require("../knexfile.js");
const knex = require("knex")(config[process.env.NODE_ENV || "development"]);

module.exports = require("bookshelf")(knex);
