const mongoose = require('mongoose');

const exam = mongoose.model('exams', new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    mark:
    {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0 || value > 20) {
                throw new Error('La note doit être comprise entre 0 et 20')
            }
        }
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    },
    matterId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true
    }
}))

module.exports = exam;