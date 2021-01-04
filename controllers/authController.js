const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require("../database/models");

const authController = {
    async login(req, res) {
        const { email, password } = req.body;
        const user = await db.User.findOne({where: {email}});
        if (user) {
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (comparePassword) {
                const secret = process.env.JWT_SECRET_KEY || 'secret';
                const role = user.is_admin ? 'admin' : 'member';

                const access_token = jwt.sign({ id: user.id, role: role }, secret, { expiresIn: '2h' });
                if (access_token) {
                    res.status(200).send({message: "Login success!", access_token});
                }
            } else {
                res.status(404).send({ message: "Password doesn't match!" });
            }
        } else{
            res.status(404).send({message: "User not registered!"});
        }
    },
    async register(req, res) {
        const {full_name, username, email, password} = req.body;
        const user = await db.User.findOne({ where: { email } });
        if (user) {
            return res.status(201).send({ message: "The email is already registered!" });
        } else {
            const salt = await bcrypt.genSaltSync(10);
            const passwordHashed = bcrypt.hashSync(password, salt);
            await db.User.create({ full_name, username, email, password:passwordHashed, is_admin:0 });
            return res.status(200).send({ message: "Register succesfully!" });
        }
    }
};

module.exports= authController;