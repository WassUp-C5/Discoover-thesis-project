const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    date: Date,
    price: Number,
    description: String,
    // activities: [],
    maxTravelers: String,
    organizerId: String,
    // travelers: []
    guide: [],
    published: {
      type: Boolean,
      default: false}
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripsSchema);

module.exports = Trip;
