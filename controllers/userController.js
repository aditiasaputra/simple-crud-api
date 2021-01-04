const bcrypt = require('bcrypt');
const db = require("../database/models");

const userController = {
    async getUsers(req, res){
        const users = await db.User.findAll({attributes: ['full_name', 'username', 'email']});
        return res.status(200).send(users);
    },
    async getUserById(req, res){
        const id = req.params.id;
        const user = await db.User.findOne({ where: {id}, attributes: ['full_name', 'username', 'email'] });
        if (user) {
            return res.status(200).send({user});
        } else {
            return res.status(404).send({ message: 'User not found!' });
        }
    },
    async store(req, res){
        const {full_name, username, email, password} = req.body;
        const salt = await bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(password, salt);
        await db.User.create({ full_name, username, email, password:passwordHashed, is_admin:0 });
        return res.status(200).send({ message: "User succesfully added!" });
    },
    async update(req, res){
        const id = req.params.id;
        const {full_name, username, email} = req.body;
        let user = await db.User.findOne({where: {id}});
        if (user) {
            user.full_name = full_name;
            user.username = username;
            user.email = email;
            await user.save()
            return res.status(200).send({message: 'User succesfully updated!'});
        } else {
            return res.status(404).send({ message: "Error!" });
        }
    },
    async destroy(req, res){
        const id = req.params.id;
        let user = await db.User.findOne({ where: {id} });
        if (user) {
            await user.destroy();
            return res.status(200).send({message: 'User succesfully deleted!'});
        } else {
            return res.status(404).send({message: 'Error!'});
        }
    },
};

module.exports = userController;