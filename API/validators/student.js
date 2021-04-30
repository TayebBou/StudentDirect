const Joi = require ('@hapi/joi');

module.exports = {
    schema: () => {
        return Joi.object().keys({
            firstName: Joi.string().trim().min(3).max(50).required(),
            lastName: Joi.string().trim().min(3).max(50).required(),
            cin: Joi.string().regex(/^[A-Z0-9]{8}$/).required().trim(),
            sexe: Joi.string().valid('Homme', 'Femme').required(),
            specialty: Joi.string().min(3).max(50).trim().default('aucune specialite'),
            email: Joi.string().email({ minDomainSegments: 2 }).trim().required().lowercase(),
            level: Joi.string().valid('1AM', '1AI', '2AM', '2AI', '3ISI', '3AM', '4ISI', '4AM', '5ISI', '5AM').required(),
            numberPhone: Joi.string().regex(/^([06]{2})+([0-9]{8}$)/).trim(),
        });
    },
 }