const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PricesSchema = Schema({
    name: String,
    price: Number
});

const EventSchema = Schema({
    title: {
      type: String, 
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    },
    prices: {
      type: [PricesSchema]
    },
    invites: {
      type: [String]
    },
    access: {
      type: String,
      default: 'global'
    },
    location: {
      type: String
    },
    timestamp: {
      type: Date,
      default: Date.now()
    }
});

EventSchema.virtual('getTotalPrice').get(() => {
  return this.prices.reduce((total, expense) => {
    return total + expense.price;
  });
});

module.exports = Event = mongoose.model('Event', EventSchema);