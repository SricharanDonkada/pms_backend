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

router.get('/delete/:list_id/:board_id',(req,res)=>{
    boardSchema.findOne({_id:req.params.board_id}).then((obj)=>{
        for(i = 0;i < obj.lists.length;i++){
            if(obj.lists[i]==req.params.list_id){
                obj.lists.splice(i,1);
                boardSchema.updateOne({_id:obj._id},{$set:{lists:obj.lists}},(err)=>{
                    if(err){
                        console.log(err);
                    }
                    res.json({message:"deleted"});
                    res.end();
                });
            }
        }
    });
});

module.exports = router;