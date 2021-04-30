const mongoose = require('mongoose');

const paymentShema = new mongoose.Schema({
    amountPaid: {
        type: Number,
        required: true,
        validate(value){
            if(value < 0){
                throw new Error('Le montant à payer doit être positif');
            }
        }
    },
    paymentDate: {
        type: Date,
        required: true
    },
    modePayment: {
        type: String,
        enum: ['Espèces', 'Chèque', 'Carte de paiement'],
        required: true
    },
    studentId: {
        type: String,
        trim: true,
        required: true
    }
})

const payment = mongoose.model('payments' , paymentShema)

module.exports = payment;