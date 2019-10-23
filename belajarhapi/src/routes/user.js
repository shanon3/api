'use strict';

const joi = require('@hapi/joi');

exports.plugin = {
    pkg: require('../../package.json'),
    name: 'route-books',
    register: async (server, options, next) => {
        const basePath = '/api/v1/users/';
        server.route([
            {
                method: 'GET',
                path: basePath + 'users',
                handler: (request, h) => {
                    const data = { data: 'Hello from users' } //contoh berbentuk json
                    return h.response(data).code(200)
                }
            },
            {
                method: 'GET',
                path: basePath + 'users/{id}',
                options:{
                    validate:{
                        params:{
                            id: joi.number().required().min(1)
                        },
                        query:{
                            page: joi.number().min(0).default(1),
                        }
                    }
                },
                handler: (request, h) => {
                    return 'Hello from user ' + request.params.id + ' Parameter Page = ' + request.query.page; //menggunakan parameter
                }
            }
        ]);
    }
};