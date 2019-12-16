const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./routes/api/auth');
const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// DB Config

// Connect to mongo

//use Routes
app.use('/api/auth', auth);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
