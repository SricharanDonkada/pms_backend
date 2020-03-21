const mongoose = require('mongoose');

const boardDataSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    members: {
        type: Array,
        default: []
    },
    lists: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('board', boardDataSchema);