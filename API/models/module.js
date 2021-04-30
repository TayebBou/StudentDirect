const mongoose = require('mongoose');

const moduleM = mongoose.model('modules', new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    average:
        {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0 || value > 20) {
                    throw new Error('La note doit être comprise entre 0 et 20')
                }
            }
        }
    ,
    level: {
        type: String,
        enum: ['1AM', '1AI', '2AM', '2AI', '3ISI', '3AM', '4ISI', '4AM', '5ISI', '5AM'],
        required: true
    },
    matters: [{
        name: {
            type: String,
            trim: true,
            required: true
        },
        coefficient:
        {
            type: Number,
            required: true,
            validate(value) {
                if (value <= 0 || value > 7) {
                    throw new Error('Le coéfficient doit être compris entre 1 et 7')
                }
            }
        }
        ,
        average:
        {
            type: Number,
            default: 0,
            validate(value) {
                if (value < 0 || value > 20) {
                    throw new Error('La note doit être comprise entre 0 et 20')
                }
            }
        }
    }]
}))

module.exports = moduleM;