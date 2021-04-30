const Joi = require ('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    schema: () => {
        return Joi.object().keys({
            matter: Joi.string().min(3).max(50).required().trim(),
            durationInMin: Joi.number().min(5).max(15).integer().required(),
            date: Joi.date().required(),
            session: Joi.number().min(1).max(4).integer().required(),
            reasonDelay: Joi.string().trim().default('Raison non spécifiée'),
            studentId: Joi.objectId()
        });
    }
 }