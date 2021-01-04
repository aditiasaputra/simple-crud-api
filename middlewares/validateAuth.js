const jwt = require('jsonwebtoken');

const validateAuth = {
    isAuthenticated(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (verifiedToken) {
                next();
            }

        } catch (error) {
            res.status(401).send({message: 'Access token invalid!'});
        }
    },
    isAdmin(req, res, next){
        const token = req.headers.authorization.split(" ")[1];
        const access_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const role = access_token.role;
        if (role === 'admin') {
            next();
        } else {
            res.status(401).send({ message: "Access denied!" });
        }
    }
};

module.exports = validateAuth;