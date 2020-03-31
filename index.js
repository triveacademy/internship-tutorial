'use strict';

const Hapi = require('@hapi/hapi');
const env = require('env2')("env.json");

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([{
        plugin: require('hapi-pgsql'),
        options: {
            database_url: process.env.DATABASE_URL
        }
    }]);

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            const time = await request.pgsql.query('SELECT NOW()')
            return `Hello World! Time: ${time.rows[0].now}`;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();