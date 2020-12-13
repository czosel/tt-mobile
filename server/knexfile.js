// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "db",
      user: "ttmobile",
      password: "ttmobile",
      charset: "utf8",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
