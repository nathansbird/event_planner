const express = require('express');
const router = express.Router();
const Event = require('../../models/event');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


router.get('/', auth, async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

//TODO: Get rid of this!!!
router.delete('/', auth, async (req, res) => {
  await Event.deleteMany();
  res.send('Done');
});

router.post(
  '/create', 
  auth,
  [
    check('title', 'Please include an event title').exists().isString(),
    check('desc', 'Please include an event description').exists().isString(),
    check('time', 'Please include an event time').exists().isNumeric(),
    check('prices', '\'Prices\' must be in array format').isArray(),
    check('invites', 'Event invitation(s) must be in array format').isArray(),
    check('access', 'Please include the event access string').exists().isString(),
    check('location', 'The event location must be a string').isString(),
  ],
  async (req, res) => {
    //new event
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const newEvent = new Event({
      title: req.body.title,
      desc: req.body.desc,
      time: req.body.time,
      prices: req.body.prices,
      invite: req.body.invites,
      access: req.body.access,
      location: req.body.location,
      timestamp: req.body.timestamp,
    });

    try {
      const saveResult = await newEvent.save();
      res.send(saveResult);
    } catch (error) {
      res.status(400).send(error);
    }  
  }
);

router.delete(
  '/delete',
  auth,
  [
    check('id', 'Please include the event id').exists().isString()
  ],
  async (req, res) => {
    //delete an event
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = req.body.id;
      await Event.deleteOne({_id: id});
      res.send(`${id} deleted`);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  );
  
  router.patch('/update',
    auth,
    [
      check('id', 'Please include the event id').exists().isString(),
      check('title', 'Event title must be a string').isString(),
      check('desc', 'Event description must be a string').isString(),
      check('time', 'Event time must be numeric').isNumeric(),
      check('prices', '\'Prices\' must be in array format').isArray(),
      check('invites', 'Event invitation(s) must be in array format').isArray(),
      check('access', 'The event access must be a string').isString(),
      check('location', 'The event location must be a string').isString(),
    ],
    async (req, res) => {
      try {
        const event = await Event.findOne({_id: req.body.id});
        event.title = req.body.title || event.title;
        event.desc = req.body.desc || event.desc;
        event.time = req.body.time || event.time;
        event.prices = req.body.prices || event.prices;
        event.invite = req.body.invite || event.invite;
        event.access = req.body.access || event.access;
        event.location = req.body.location || event.location;
        event.timestamp = req.body.timestamp || event.timestamp;
        const result = await event.save();

        res.send(result); 
      } catch (error) {
        res.status(400).send(error);
      }
    }
  );
  
  module.exports = router;