const mongoose = require('mongoose');

const listDataSchema = new mongoose.Schema({
    title: {
        type: String
    },
    cards: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('list', listDataSchema);