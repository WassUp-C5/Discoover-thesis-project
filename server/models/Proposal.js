const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    organizerId: String,
    guideId: String,
    tripId: String,
    accepted: Boolean
  },
  {
    timestamps: true,
  }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
