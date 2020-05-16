const db = require('../data/db-config'); 

module.exports = {
    find, 
    findById, 
    findTasks, 
    add, 
    addResource,
    // remove,

}

function find() {
    return db('projects'); 
}

function findById(id) {
    return db('projects').where({ id }).first()
}

function findTasks(id) {
    return db('projects').join('tasks', 'projects.id', 'tasks.project_id' ).select('tasks.id', 'projects.project_name', 'projects.project_desc', 'tasks.task_desc', 'tasks.notes', 'tasks.completed' ).where({ "tasks.project_id": id }); 
}


function add(post) {
    return db('projects').insert(post, 'id')
    .then(ids => {
        return findById(ids[0]); 
    })
}

function addResource(join_id) {

    return db('project_resources').insert(join_id); 
}