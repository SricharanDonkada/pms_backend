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

router.post('/share',(req,res)=>{
    let email = req.body.user_email;
    let board_id = req.body.board_id;

    user.findOne({email:email}).then((usr)=>{
        if(usr == undefined){
            res.json({message:"Account does not exist"});
            res.end();
        }
        else{
            let alreadyExists = false;
            for(i = 0;i < usr.boards.length;i++){
                if(board_id == usr.boards[i]){
                    alreadyExists = true;
                    break;
                }
            }
            if(alreadyExists){
                res.json({message:"User already has this board"});
                res.end();
            }else{
                user.updateOne({email:email},{$push:{boards:board_id}},(err)=>{
                    if(err){
                        console.log(err);
                        res.json({message:"An Error Occoured!"});
                        res.end();
                    }else{
                        res.json({message:"success"});
                        res.end();
                    }
                });
            }
        }
    });
});

router.get('/delete/:board_id/:user_id',(req,res)=>{
    console.log("delete board request stated");
    user.findOne({_id:req.params.user_id}).then((obj)=>{
        for(i = 0;i < obj.boards.length;i++){
            if(obj.boards[i] == req.params.board_id){
                obj.boards.splice(i,1);
                user.findOneAndUpdate({_id:obj._id},{$set:{boards:obj.boards}},(err)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log("delete board request end");
                    res.json({message:"deleted"});
                    res.end();
                });
            }
        }
    });
});

module.exports = router;