const Models = require('../../models/index')
const joi = require('@hapi/joi')

const todosHandler = async (request, h) => {
    try{   console.log('baca')
        const todos = await Models.Todos.findAll({})
        return {data: todos}
    }catch(error){
        return h.response({error: error.message}).code(400)
    }
}

    const createTodoHandler = async (request, h) => {
        try{
            const{titleReq, descriptionReq, userIdReq, completedReq, dateReq, emailReq} = request.payload
            console.log(request.payload);
            console.log('input')
            const todo = await Models.Todos.create({
                title: titleReq,
                description: descriptionReq,
                userId: userIdReq,
                completed: completedReq,
                dateActivity: dateReq,
                email: emailReq
            })
            return{
                data: todo,
                message: 'New todo has been created.'
            }
        }
        catch(error){
            return h.response({
                error: error.message
            }).code(400)
        }
    }

    const updateTodoHandler = async (request, h) => {
        try{
            const todo_id = request.params.id;
            const{titleReq, descriptionReq, completedReq} = request.payload;
            const todo = await Models.Todos.update({
                title: titleReq,
                description: descriptionReq,
                completed: completedReq
            }, {
                where: {
                    id: todo_id
                }
            })
            const dataRequest = request.payload
            console.log('dataRequest');
            console.log(todo);
            return{
                data: dataRequest,
                message: 'Todo has been updated'
            }
        }catch (error){
            return h.response({
                error: error.message
            }).code(400)
        }
    }
    const deleteTodoHandler = async (request,h) => {
        try{
            const todo_id = request.params.id;
            await Models.Todos.destroy({
                where:{
                    id: todo_id
                }
            })
            return {message: 'Todo has been deletred.'}
        }catch(error){
            return h.response({
                error: error.message
            }).code(400)
        }
    }


module.exports = [
    { method: 'GET', path: '/todos', handler: todosHandler },
    {
        method: 'POST', path: '/todo',
        config: {
            validate: {
                payload: {
                    titleReq: joi.required(),
                    descriptionReq: joi.string().required(),
                    userIdReq: joi.number().min(1).required(),
                    completedReq: joi.boolean().required(),
                    dateReq: joi.date().required(),
                    emailReq: joi.string().required()
                }
            }
        },
        handler: createTodoHandler
    },
    {method: 'PUT', path: '/todo/{id}',
    config: {
        validate: {
            payload: {
                titleReq: joi.required(),
                descriptionReq: joi.string().required(),
                userIdReq: joi.number().min(1).required(),
                completedReq: joi.boolean().required(),
                dateReq: joi.date().required(),
                emailReq: joi.string().required()
            }
        }
    },
    handler: updateTodoHandler},
    {method: 'DELETE', path: '/todo/{id}', handler: deleteTodoHandler},
];