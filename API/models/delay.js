const mongoose = require('mongoose');


const delay = mongoose.model('delays', new mongoose.Schema({
    matter: {
        type: String,
        trim: true,
        required: true
    },
    
    durationInMin: {
        type: Number,
        required: true,
        validate(value){
            if(value < 0 || value > 15){
                throw new Error('La durée doit être comprise entre 0 et 15')
            }
        }
    },
    date: {
        type: Date,
        required: true
    },
    session: {
        type: Number,
        required: true,
        validate(value){
            if(value < 1 || value > 4){
                throw new Error('Le numéro de séance doit être compris entre 1 et 4')
            }
        }
    },
    reasonDelay: {
        type: String,
        trim: true,
        default: 'Raison non spécifiée'
    },
    studentId: {
        type: String,
        trim: true,
        required: true
    }
}))

module.exports = delay;