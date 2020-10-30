const travelersRouter = require("express").Router();
const User = require("../models/User");

travelersRouter.get("/:id", async (req, res) => {
  try {
    let traveler = await User.findById(req.params.id).populate(
      { path:"tripReservations", populate: {path: 'trip', populate: {path: 'organizerId'}} }
    )
    console.log("traveler ====>", traveler);
    res.send(traveler);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = travelersRouter;
