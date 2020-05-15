
exports.up = function(knex) {
  return knex.scheme
  .createTable('projects', tbl => {
      tbl.increments(); 
      tbl.string('name').notNullable().unique(); 
      tbl.string('description'); 
      tbl.boolean('completed').defaultTo(false).notNullable(); 
  })

  .createTable('resources', tbl => {
      tbl.increments(); 
  }
};

exports.down = function(knex) {
  
};
