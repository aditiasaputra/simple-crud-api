const db = require('../database/models');

const todoController = {
    async getTodos(req, res){
        const todos = await db.Todo.findAll({attributes: ['name', 'description', 'author']});
        return res.status(200).send(todos);
    },
    async getTodoById(req, res) {
        const id = req.params.id;
        const todo = await db.Todo.findOne({ where: {id}, attributes: ['name', 'description'] });
        if (!todo) {
            return res.status(404).send({message: 'Todo not found!'});
        }
        return res.status(200).send({todo});
    },
    async store(req, res) {
        const { name, description, author } = req.body;
        await db.Todo.create({ name, description, author});
        return res.status(200).send({message: "Todo succesfully added!"});
    },
    async update(req, res){
        const id = req.params.id;
        const { name, description, author } = req.body;
        let todo = await db.Todo.findOne({where: {id}});
        if (todo) {
            todo.name = name;
            todo.description = description;
            todo.author = author;
            await todo.save()
            return res.status(200).send({message: 'Todo succesfully updated!'});
        } else {
            return res.status(404).send({ message: "Error!" });
        }
    },
    async destroy(req, res) {
        const id = req.params.id;
        let todo = await db.Todo.findOne({ where: {id} });
        if (todo) {
            await todo.destroy();
            return res.status(200).send({message: 'Todo succesfully deleted!'});
        } else {
            return res.status(404).send({message: 'Error!'});
        }
    }
};

module.exports= todoController;