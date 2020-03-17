const mongoose = require('mongoose');

const verifications = mongoose.Schema({
    phoneNumber: {
        type: String,
        unique: true
    },
    code: {
        type: Number
    }
});

module.exports = mongoose.model('verifications', verifications);