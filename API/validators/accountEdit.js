const Joi = require ('@hapi/joi');

module.exports = {
    schema: () => {
        return Joi.object().keys({
            firstName: Joi.string().trim().min(3).max(50).required(),
            lastName: Joi.string().trim().min(3).max(50).required(),
            email: Joi.string().email({ minDomainSegments: 2 }).trim().required().lowercase(),
            login: Joi.string().min(6).max(50).required().trim(),
            password: Joi.string().min(6).regex(/^[a-zA-Z0-9]{3,30}$/)
        });
    }
 }