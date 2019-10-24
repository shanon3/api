const Hapi = require('@hapi/hapi');
const joi = require('@hapi/joi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const routes = require('./src/routes/todoRoute');
server.route([
    {
        method: 'POST',
        path: '/todo',
        config: {
            validate: {
                payload: {
                    title: joi.string().min(1).required(),
                    description: joi.string().min(1).required(),
                    userId: joi.number().min(1).required(),
                    completed: joi.number().min(1).required(),
                    date: joi.date().min(1).required()
                }
            }
        },
        handler: (request, h) => {
            console.log(request.payload); //cek parameter inputan form
                let panjangRequest = request.payload.panjang; //konversi string ke number
                let lebarRequest = request.payload.lebar;
                let hasil = parseInt(panjangRequest) * parseInt(lebarRequest) //bikin variabel penampung nilai luas 
                const data = { statusCode: 200, error: '', message: 'Hitung luas persegi', content : {
                    ...request.payload,
                    hasil: hasil }  
                } //bikin respon berbentuk json
                return h.response(data).code(200) // return out pun berupa json
        }
    }
])


const init = async () => {
    await server.start();
    console.log(`Server running ats: ${server.info.uri}`);
};
process.on('unhandledRejection',(err) => {
    console.log(err);
    process.exit(1);
});
init();