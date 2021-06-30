require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: process.env.DB_NAME || "db",
      user: process.env.DB_USER || "ttmobile",
      password: process.env.DB_PASSWORD || "ttmobile",
      charset: "utf8",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
