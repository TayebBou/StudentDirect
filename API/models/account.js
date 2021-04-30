const mongoose = require('mongoose');
const validator = require('validator');
var accountSchema = new mongoose.Schema({
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        dropDups: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalide')
            }
        }
    },
    login: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        dropDups: true,
        minlength: 6,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    role: {
        type:String,
        required: true,
        enum: ['etudiant', 'administrateur'],
        trim: true,
    },
    token: {
        type: String,
        default: '',
    }
});

const account = mongoose.model('accounts' , accountSchema)

module.exports = account;