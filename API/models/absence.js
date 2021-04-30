const mongoose = require('mongoose');

const absence = mongoose.model('absences', new mongoose.Schema({
    session: {
        type: Number,
        required: true,
        validate(value){
            if(value < 1 || value > 4){
                throw new Error('Le numéro de séance doit être compris entre 1 et 4')
            }
        }
    },
    date: {
        type: Date,
        required: true
    },
    matter: {
        type: String,
        trim: true,
        required: true
    },
    justification: {
        type: String,
        trim: true,
        default: 'Non justifiée'
    },
    studentId: {
        type: String,
        trim: true,
        required: true
    }
}))

module.exports = absence;