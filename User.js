const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,  
        unique: true,
    },
    message: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema);