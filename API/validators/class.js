const Joi = require ('@hapi/joi');

module.exports = {
    schema: () => {
        return Joi.object().keys({
            nameClass: Joi.string().min(3).max(30).required().trim(),
        });
    }
 }