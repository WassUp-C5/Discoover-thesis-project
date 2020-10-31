const mongoose = require('mongoose');
const db = require("./../../db/config.js");

const tripReservationSchema = new mongoose.Schema({
  confirmed: Boolean,
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  }
})
