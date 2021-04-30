const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    schema: () => {
        return Joi.object().keys({
            name: Joi.string().trim().min(3).max(50).required(),
            mark: Joi.number().min(0).max(20).integer().default(0),
            studentId: Joi.objectId(),
            matterId: Joi.objectId()
        });
    }
}