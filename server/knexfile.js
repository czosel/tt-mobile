// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: "db",
      user: "ttmobile",
      password: "ttmobile",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
