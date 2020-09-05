const bookshelf = require("./bookshelf");

const Club = bookshelf.model("Club", { tableName: "club" });

module.exports = { Club };
