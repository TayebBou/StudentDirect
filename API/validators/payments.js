const Joi = require ('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    schema: () => {
        return Joi.object().keys({
            amountPaid: Joi.number().positive().required(),
            paymentDate: Joi.date().required(),
            modePayment: Joi.string().valid('Espèces', 'Chèque', 'Carte de paiement').required(),
            studentId: Joi.objectId()
        });
    }
 }