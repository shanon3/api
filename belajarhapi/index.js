//CREATING SERVER


const joi = require('@hapi/joi');

const Hapi = require('@hapi/hapi'); //require hapi
    const server = new Hapi.server({ //initialize new Hapi.server()
        host: 'localhost',
        port: 3101, //port yang dipanggil
    });

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'I am root route';
            },
        },
        {
            method: 'GET',
            path: '/hello',
            handler: (request, h) => {
                return {msg: 'I am hello'};
            },
        },
        {
            method: 'POST',
            path: '/register',
            handler: (request, h) => {
                return {msg: 'I am register using post'};
            },
        },
        {
            method: 'POST',
            path: '/persegi',
            config: {
                validate: {
                    payload: {
                        panjang: joi.number().min(1).required(),
                        lebar: joi.number().min(1).required()
                    }
                }
            },
            handler: (request, h) => {
                console.log(request.payload); //cek parameter inputan form
                    let panjangRequest = request.payload.panjang; //konversi string ke number
                    let lebarRequest = request.payload.lebar;
                    let hasil = parseInt(panjangRequest) * parseInt(lebarRequest) //bikin variabel penampung nilai luas 
                    const data = { data: 'rumus persegi',...request.payload, hasilPerhitungan: hasil } //bikin respon berbentuk json
                    return h.response(data).code(200) // return out pun berupa json
            }
        },
        {
            method: 'POST',
            path: '/ganjilGenap',
            config: {
                validate: {
                    payload: {
                        angka: joi.number().min(1).required()
                    }
                }
            },
            handler: (request, h) => {
                console.log(request.payload); //cek parameter inputan form
                    let angkaRequest = request.payload.angka; //konversi string ke number
                    let hasil;
                    if(parseInt(angkaRequest) % 2 === 1){
                        hasil = 'Bilangan Ganjil';
                    }else{
                        hasil = 'Bilangan Genap';
                    }
                    const data = { data: 'Menentukan bilangan ganjil genap',...request.payload, hasilAkhir: hasil } //bikin respon berbentuk json
                    return h.response(data).code(200) // return out pun berupa json
            }
        }
]);

    const main = async() => {
        await server.register(require('./src/routes/user'));
        await server.start() //start the ser ver
        return server
    };

    main().then(server =>{
        console.log('Server running at: ', server.info.uri)
    }).catch(err => {
        console.log(err);
        process.exit(1);
    })

