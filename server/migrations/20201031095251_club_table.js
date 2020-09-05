exports.up = function (knex) {
  return knex.schema.createTable("club", function (table) {
    table.integer("id").primary();
    table.string("name");
    table.string("logo");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("club");
};
