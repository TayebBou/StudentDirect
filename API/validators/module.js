const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const SchemaMatter = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().trim().min(3).max(50).required(),
    average: Joi.number().min(0).max(20).integer().default(0),
    coefficient: Joi.number().min(1).max(7).integer().required()
})

module.exports = {
    schema: () => {
        return Joi.object().keys({
            name: Joi.string().trim().min(3).max(50).required(),
            average: Joi.number().min(0).max(20).integer().default(0),
            level: Joi.string().valid('1AM', '1AI', '2AM', '2AI', '3ISI', '3AM', '4ISI', '4AM', '5ISI', '5AM').required(),
            matters: Joi.array().items(SchemaMatter)
        });
    }
}