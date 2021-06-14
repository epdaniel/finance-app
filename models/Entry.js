const mongoose = require("mongoose");

const EntrySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    subCategory: {
        type: String,
    },
    isExpense: {
        // if not expense, then income
        type: Boolean,
    },
});

module.exports = mongoose.model("Entry", EntrySchema);
