const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require("../../models/user");

router.get('/', (req, res) => {
    //Log all users

    User.find({}, (err, docs) => {
        console.log(docs.length);
        res.send(docs);
    });
});

router.get('/login', (req, res) => {
    let password = req.body['password'];
    let email = req.body['email'];
    
    //Check if email is in DB
    //If not, send and error reponse
    //If it is, get hash and compare

    User.find({email: email}, (err, docs) => {
        if(docs.length != 0){
            let match = bcrypt.compare(password, docs[0].password);
            if(match){
                //Valid, issue a token?
                res.send("Correct password! Consider yourself logged in!");
            }
        }else{
            res.send("No user with that email");
        }
    });
});

router.post('/register', (req, res) => {
    let password = req.body['password'];
    let email = req.body['email'];
    
    //Check if email is in DB
    //If not, store email and hash
    //If it is, send an error respose

    User.find({email: email}, (err, docs) => {
        if(docs.length != 0){
            res.send("Email taken");
        }else{
            let hash = bcrypt.hashSync(password, 8);
            const newUser = new User({
                email: email,
                password: hash
            });
            newUser.save().then(user => res.send(user)).catch((e) => {res.status(500).send(e)});
        }
    });
});

router.delete('/', (req, res) => {
    User.deleteMany().then(() => {res.send('Deleting Everything!')});
});

module.exports = router;