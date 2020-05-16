
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
      tbl.increments();  
      tbl.string('project_name', 255).notNullable(); 
      tbl.string('project_desc'); 
      tbl.timestamps(true,true); 
      tbl.boolean('completed').defaultTo(false).notNullable(); 

  })

  .createTable('resources', tbl => {
    tbl.increments(); 
    tbl.string('resource_name').notNullable().unique(); 
    tbl.string('description'); 
})

  .createTable('project_resources', tbl => {
      tbl.increments(); 

      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

        tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
  })

  .createTable('tasks', tbl => {
      tbl.increments(); 
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
      
      tbl.string('task_desc').notNullable(); 
      tbl.string('notes'); 
      tbl.boolean('completed').defaultTo(false).notNullable(); 
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('projects')
  .dropTableIfExists('resources')
  .dropTableIfExists('project_resources')
  .dropTableIfExists('tasks')
};
