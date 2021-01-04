const {check, validationResult} = require('express-validator');

const rules = [
    check('email')
        .notEmpty().withMessage('The email is required!')
        .isEmail().withMessage('The email must be valid!')
        .normalizeEmail()
        .trim()
        .escape(),

    check('password')
        .notEmpty().withMessage('The password is required!')
        .isString().withMessage('The password must contain letter!')
        .trim()
        .escape(),
];

const validateLogin = [
    // Rules
    rules,
    // Response
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        next();
    }
];

module.exports = validateLogin;