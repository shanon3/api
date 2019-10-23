//CREATING SERVER

'use strict';

const Hapi = require('@hapi/hapi'); //require hapi
const init = async () => {
    const server = Hapi.server({ //initialize new Hapi.server()
        port: 3000, //port yang dipanggil
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    await server.start(); //start the server
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

