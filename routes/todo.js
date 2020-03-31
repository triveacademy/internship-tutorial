'use strict';
const escape = require('pg-escape');
 
module.exports = [{
    method: 'GET',
    path: '/todos',
    handler: async (request, h) => {
        const todos = await request.pgsql.query(`SELECT * FROM todo`)
        return todos.rows
    }
},{
    method: 'GET',
    path: '/todo/{todo_id}',
    handler: async (request, h) => {
        const selectSQL = escape(`SELECT * FROM todo WHERE todo_id = %L LIMIT 1`, request.params.todo_id)
        const todos = await request.pgsql.query(selectSQL)
        return todos.rows[0]
    }
}];