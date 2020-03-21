const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// IMPORTING ROUTES
const userRoute = require('./routes/user');
const boardRoute = require('./routes/board');
const listRoute = require('./routes/list');
const cardRoute = require('./routes/card');



// CONNECTING TO DB
mongoose.connect('mongodb://localhost:27017/pms', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log('succesfully connected to db');
    } else {
        console.log(err);
    }
});


//LISTENING TO THE SERVER
app.listen(4000, () => {
    console.log('server started at 4000');
});


//ROUTES
app.use('/user', userRoute);
app.use('/board', boardRoute);
app.use('/list', listRoute);
app.use('/card', cardRoute);