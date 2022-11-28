const { check, validationResult } = require('express-validator')

exports.validationForsignup = [
    check('firstname')
    .notEmpty()
    .withMessage('First Name is Required'),

    check('lastname')
    .notEmpty()
    .withMessage('Last Name is Required'),

    check('email')
    .isEmail()
    .withMessage('Valid Email is Required'),

    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be more than 6 charectar')
]

exports.validationForsigin = [

    check('email')
    .isEmail()
    .withMessage('Valid Email is Required'),

    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be more than 6 charectar')
]

exports.isvalidated = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    next();
}