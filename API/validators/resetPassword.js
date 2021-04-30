const Joi = require ('@hapi/joi');

module.exports = {
    schema: () => {
        return Joi.object().keys({
            password: Joi.string().min(6).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            token: Joi.string().required()
        });
    }
 }