const express = require('express');
const router = express.Router();

const boardSchema = require('../models/board');
const user = require('../models/user');
router.post('/new-board', (req, res) => {
    const board = new boardSchema({
        title: req.body.title,
        members: [req.body.user_id]
    });
    board.save().then((data) => {
        user.findOneAndUpdate({ _id: req.body.user_id }, { $push: { boards: data._id } }, (err, dat) => {
            if (err) {
                console.log(err);
            }
        });
        res.json(data);
        res.end();
    });
});

router.get('/board-data/:id', (req, res) => {
    boardSchema.findOne({ _id: req.params.id }).then((data) => {
        res.json(data);
        res.end();
    });
});

module.exports = router;