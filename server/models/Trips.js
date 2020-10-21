const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    date: Date,
    price: String,
    description: String,
    // activities: [],
    maxTravelers: String,
    // travelers: []
    guide: []
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripsSchema);

module.exports = Trip;
