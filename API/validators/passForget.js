const Joi = require ('@hapi/joi');

module.exports = {
    schema: () => {
        return Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2 }).trim().required().lowercase(),
        });
    }
 }