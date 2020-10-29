const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    },
    accepted: { type: Boolean, default: null }
  },
  {
    timestamps: true,
  }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
