const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    subCategory: {
        type: String
    }
});

module.exports = mongoose.model('Entry', EntrySchema);