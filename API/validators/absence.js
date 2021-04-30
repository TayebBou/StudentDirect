const Joi = require ('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    schema: () => {
        return Joi.object().keys({
            session: Joi.number().min(1).max(4).integer().required(),
            date: Joi.date().required(),
            matter: Joi.string().min(3).max(50).required().trim(),
            justification: Joi.string().trim().default('Non justifiée'),
            studentId: Joi.objectId()
        });
    }
 }