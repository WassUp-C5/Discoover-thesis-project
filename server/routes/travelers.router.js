const travelersRouter = require("express").Router();
const User = require("../models/User");

/**
 * Get one traveler by id
 */
travelersRouter.get("/:id", async (req, res) => {
  try {
    let traveler = await User.findById(req.params.id).populate(
      { path:"tripReservations", populate: {path: 'trip', populate: {path: 'organizer'}} }
    )
    console.log("traveler ====>", traveler);
    res.send(traveler);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = travelersRouter;
