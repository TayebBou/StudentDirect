const Joi = require ('@hapi/joi');

module.exports = {
    schema: () => {
        return Joi.object().keys({
            login: Joi.string().min(6).max(50).required().trim(),
            password: Joi.string().min(6).required()
        });
    }
 }