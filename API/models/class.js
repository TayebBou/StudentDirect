const mongoose = require('mongoose');

const classSchema = mongoose.model('classes' , new mongoose.Schema({
    nameClass: {
        type: String,
        trim: true,
        required: true
    }
}))

module.exports = classSchema;