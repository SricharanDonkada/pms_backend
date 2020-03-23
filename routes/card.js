const express = require('express');
const router = express.Router();

const cardSchema = require('../models/card');
const listSchema = require('../models/list');

router.post('/new-card', (req, res) => {
    let list_id = req.body.list_id;

    const card = new cardSchema({
        title: req.body.card.title,
        description: req.body.card.description,
        checklist:req.body.card.checklist
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
        res.json({ title: data.title });
        res.end();
    });
});

router.get('/card-data/:id', (req, res) => {
    cardSchema.findOne({ _id: req.params.id }).then((data) => {
        res.json(data);
        res.end();
    });
});

router.post('/update-checklist-status',(req,res)=>{
    cardSchema.findOneAndUpdate({_id:req.body.card_id},{$set:{checklist:req.body.checklist}}).then((data)=>{
        console.log(data.checklist);
        res.json(data);
        res.end();
    });
});

router.post('/move',(req,res)=>{
    let removeFrom = req.body.removeFrom;
    let insertTo = req.body.insertTo;
    let card_id = req.body.card_id;

    listSchema.findOne({_id:removeFrom}).then((obj)=>{
            for(i = 0;i < obj.cards.length;i++){
                if(obj.cards[i] == card_id){
                    obj.cards.splice(i,1);
                    listSchema.findOneAndUpdate({_id:obj._id},{$set:{cards:obj.cards}},(err)=>{
                        if(err){console.log(err)}
                    });
                }
            }
    });

    listSchema.updateOne({_id:insertTo},{$push:{cards:card_id}},(err)=>{
        if(err){
            console.log(err);
        }
        console.log("insertion completed");
    });
    res.json({message:"moved"});
    res.end();
});


router.get('/delete/:card_id/:list_id',(req,res)=>{
    listSchema.findOne({_id:req.params.list_id}).then((obj)=>{
        for(i = 0;i < obj.cards.length;i++){
            if(obj.cards[i] == req.params.card_id){
                obj.cards.splice(i,1);
                listSchema.findOneAndUpdate({_id:obj._id},{$set:{cards:obj.cards}},(err)=>{
                    if(err){console.log(err)}
                    res.json({message:"deleted"});
                    res.end();
                });
            }
        }
    });
});

module.exports = router;