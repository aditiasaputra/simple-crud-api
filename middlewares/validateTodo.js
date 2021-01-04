const {check, validationResult} = require('express-validator');

const rules = [
    check('name')
        .notEmpty().withMessage('The name is required!')
        .isString().withMessage('The name must contain letter!')
        .trim()
        .escape(),

    check('description')
        .notEmpty().withMessage('The author is required!')
        .trim()
        .escape(),

    check('author')
        .notEmpty().withMessage('The author is required!')
        .isString().withMessage('The author must contain letter!')
        .trim()
        .escape(),
];

const validateTodo = [
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

module.exports = validateTodo;