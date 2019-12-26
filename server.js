const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const auth = require('./routes/api/auth');
const event = require('./routes/api/event');
const app = express();
const keys = require('./config/keys');

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Mongoose
mongoose.connect(keys.mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected");
});

//use Routes
app.use('/api/auth', auth);
app.use('/api/event', event);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;