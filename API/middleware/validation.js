const Joi = require('@hapi/joi');
const loginValidator = require('../validators/login');
const verifyTokenValidator = require('../validators/verifyToken');
const absenceValidator = require('../validators/absence');
const accountValidator = require('../validators/account');
const accountEditValidator = require('../validators/accountEdit');
const classValidator = require('../validators/class');
const delayValidator = require('../validators/delay');
const moduleValidator = require('../validators/module');
const examValidator = require('../validators/exam');
const passForgetValidator = require('../validators/passForget');
const resetPasswordValidator = require('../validators/resetPassword');
const paymentValidator = require('../validators/payments');
const studentValidator = require('../validators/student');


let validationInputs = (modelName) => {
    return (req, res, next) => {
        switch (modelName) {
            case 'login':
                schema = loginValidator.schema();
                break;
            case 'verifyToken':
                schema = verifyTokenValidator.schema();
                break;
            case 'absence':
                schema = absenceValidator.schema();
                break;
            case 'account':
                schema = accountValidator.schema();
                break;
            case 'accountEdit':
                schema = accountEditValidator.schema();
                break;
            case 'class':
                schema = classValidator.schema();
                break;
            case 'delay':
                schema = delayValidator.schema();
                break;
            case 'module':
                schema = moduleValidator.schema();
                break;
            case 'exam':
                schema = examValidator.schema();
                break;
            case 'passForget':
                schema = passForgetValidator.schema();
                break;
            case 'resetPassword':
                schema = resetPasswordValidator.schema();
                break;
            case 'payment':
                schema = paymentValidator.schema();
                break;
            case 'student':
                schema = studentValidator.schema();
                break;
        }
        Joi.validate(req.body, schema, (error, value) => {
            if (error) {
                return res.status(403).json({ msg: error.message });
            }
            next();
        });
    };
}



module.exports = { validation: validationInputs }