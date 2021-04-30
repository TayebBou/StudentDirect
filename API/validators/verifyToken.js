const Joi = require ('@hapi/joi');

module.exports = {
    schema: () => {
        return Joi.object().keys({
            token: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
        });
    }
 }