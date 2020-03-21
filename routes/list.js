const express = require('express');
const router = express.Router();

const listSchema = require('../models/list');
const boardSchema = require('../models/board');

router.post('/new-list', (req, res) => {
    let board_id = req.body.board_id;
    let title = req.body.title;

    const list = new listSchema({ title: title });
    list.save().then((data) => {
        boardSchema.findOneAndUpdate({ _id: board_id }, { $push: { lists: data._id } }, (err, dat) => {
            if (err) {
                console.log(err);
            }
        });
        res.json(data);
        res.end();
    });
});

router.get('/list-data/:id', (req, res) => {
    listSchema.findOne({ _id: req.params.id }).then((data) => {
        res.json(data);
        res.end();
    })
});

module.exports = router;