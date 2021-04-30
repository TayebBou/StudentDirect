const mongoose = require('mongoose');
const validator = require('validator');

const student = mongoose.model('students' , new mongoose.Schema({
    cin: {
        type: String,
        trim: true,
        dropDups: true,
        unique: true,
        required: true
    },
    sexe: {
        type: String,
        enum: ['Homme', 'Femme'],
        required: true
    },
    specialty: {
        type: String,
        trim: true,
        default: 'Aucune specialite'
    },
    
    numberPhone: {
        type: String,
        trim: true,
        unique: true,
        dropDups: true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('numéro de telephone invalide')
            }
        }
    },
    level: {
        type: String,
        enum: ['1AM', '1AI', '2AM', '2AI', '3ISI', '3AM', '4ISI', '4AM', '5ISI', '5AM'],
        required: true
    },
    accountId: {
        type: String,
        trim: true,
        dropDups: true,
        unique: true,
        required: true
    }
}))

module.exports = student;