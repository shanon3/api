const Hapi = require('@hapi/hapi');
const joi = require('@hapi/joi');

const server = Hapi.server({
    port: 8001,
    host: 'localhost'
});

const routes = require('./src/routes/todoRoute');
server.route(routes)


const init = async () => {
    await server.start();
    console.log(`Server running ats: ${server.info.uri}`);
};
process.on('unhandledRejection',(err) => {
    console.log(err);
    process.exit(1);
});
init();