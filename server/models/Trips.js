const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    date: Date,
    price: Number,
    description: String,
    // activities: [],
    maxTravelers: Number,
    travelers: [],
    guide: [],
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripsSchema);

module.exports = Trip;
