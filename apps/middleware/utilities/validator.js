const { body, validationResult } = require('express-validator');


exports.emailValidate = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 102,
                message: "Parameter email tidak sesuai format.",
                data: null
            });
        }
        next();
    },
]