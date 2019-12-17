const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
    console.log(req.user);
    res.send("Nice");
});

router.get('/login', async (req, res) => {
    let {password, email} = req.body;

    //Check if email is in DB
    //If not, send and error reponse
    //If it is, get hash and compare

    try {
        const user = await User.findOne({email: email});
        if(user){
            let match = bcrypt.compare(password, user.password);
            if(match){
                //res.send("Correct password! Consider yourself logged in!");
                const payload = {
                    user: {
                      id: user._id
                    }
                };
                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: 36000000 },
                    (err, token) => {
                      if (err) throw err;
                      res.json({ token });
                    }
                  );
            }
        }else{
            res.send("No user with that email");
        }
    } catch (e) {
        res.status(400).json({message: e})
    }
});

router.post('/register', async (req, res) => {
    let {password, email} = req.body;

    //Check if email is in DB
    //If not, store email and hash
    //If it is, send an error respose

    try {
        let user = await User.findOne({email: email});
        console.log(user);
        if(user) {
            res.send("Email taken");
        } else {
            let salt = await bcrypt.genSalt(10);
            let hash = bcrypt.hashSync(password, salt);
            let newUser = new User({
                email: email,
                password: hash
            });
            await newUser.save();
            res.send(newUser);
        }
    } catch (e) {
        res.status(400).message({message: e});
    }
});

router.delete('/', async (req, res) => {
    try {
        await User.deleteMany();
        res.send('Gone!');
    } catch (e) {
        res.status(400).message({message: e});
    }
});

module.exports = router;