const mongoose = require('mongoose');

const expenses = mongoose.Schema({
    phoneNumber: {
        type: String
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    borrowers: [
        {
            phoneNumber: {
                type: String
            }
        }
    ],
    pictures: [
        {
            title: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    location: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('expenses', expenses);