const mongoose = require("mongoose");
const db = require("./../../db/config.js");

const tripReservationSchema = new mongoose.Schema({
  confirmed: { type: Boolean, default: false },
  traveler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
  },
});

const TripReservation = mongoose.model(
  "TripReservation",
  tripReservationSchema
);

module.exports = TripReservation;
