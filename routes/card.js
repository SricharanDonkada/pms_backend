const express = require('express');
const router = express.Router();

const cardSchema = require('../models/card');
const listSchema = require('../models/list');

router.post('/new-card', (req, res) => {
    let list_id = req.body.list_id;

    const card = new cardSchema({
        title: req.body.card.title,
        description: req.body.card.description,
    });

    card.save().then((data) => {

        listSchema.findOneAndUpdate({ _id: list_id }, { $push: { cards: data._id } }, (err, dat) => {
            if (err) {
                console.log(err);
            }
        });

        res.json(data);
        res.end();
    });
});

router.get('/card-title/:id', (req, res) => {
    cardSchema.findOne({ _id: req.params.id }).then((data) => {
        res.send(data.title);
        res.end();
    });
});

module.exports = router;