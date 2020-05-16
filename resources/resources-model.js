const db = require('../data/db-config'); 

module.exports = {
    find,
    findById, 
    add, 
    // update, 
    // remove,
}

function find() {
    return db('resources'); 
}

function findById(id) {
    return db('resources').where({ id }).first(); 
}

function add(post) {
    return db('resources').insert(post, 'id')
    .then(ids => {
        return findById(ids[0]); 
    })
}

