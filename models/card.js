const mongoose = require('mongoose');

const cardDataSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    due_date: {
        type: String,
        default: ""
    },
    checklist: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('card', cardDataSchema);