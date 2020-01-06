const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
    console.log('GET: /auth/')

    console.log(req.user);
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

router.get('/all', async (req, res) => {
    const users = await User.find();
    console.log(users);
    res.send(200)
});

router.delete('/all', async (req, res) => {
    const users = await User.deleteMany();
    console.log(users);
    res.send(200)
});

router.post('/login', async (req, res) => {
    console.log('POST: /auth/login')
    let {password, email} = req.body;

    //Check if email is in DB
    //If not, send and error reponse
    //If it is, get hash and compare

    try {
        const user = await User.findOne({email: email});
        if(user){
            let match = await bcrypt.compare(password, user.password);
            if(match){
                //res.send("Correct password! Consider yourself logged in!");
                console.log(password+" matches "+user.password);
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
            }else{
                res.send("Incorrect Password")
            }
        }else{
            res.send("No user with that email");
        }
    } catch (e) {
        res.status(400).json({message: e})
    }
});

router.post('/register', async (req, res) => {
    console.log('POST: /auth/register')

    let {password, email} = req.body;

    //Check if email is in DB
    //If not, store email and hash
    //If it is, send an error respose
    console.log(password, email);
    try {
        let user = await User.findOne({email: email});
        console.log(user)
        if(user) {
            res.send("Email taken");
        } else {
            console.log('hit')
            let salt = await bcrypt.genSalt(10);
            let hash = bcrypt.hashSync(password, salt);
            let newUser = new User({
                email: email,
                password: hash
            });
            newUser.save();
            
            const payload = {
                user: {
                  id: newUser.id
                }
              };
            console.log(newUser, payload);
              jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                  if (err) throw err;
                  console.log(token);
                  res.json({ token });
                }
              );
        }
    } catch (e) {
        res.status(400).json({message: e});
    }
});

//TODO: Get rid of this!!!
router.delete('/', async (req, res) => {
    try {
        await User.deleteMany();
        res.send('Gone!');
    } catch (e) {
        res.status(400).message({message: e});
    }
});

module.exports = router;