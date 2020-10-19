const tripsRouter = require("express").Router();
const Trip = require("../models/Trips");
const User = require("../models/User");


tripsRouter.post("trip/add", async (req, res) => {
  try {
    console.log(req.body);
    var trip = new Trip(req.body);
    await trip.save().then((result) => {
      console.log("trip saved successfully");
      User.findById(req.body.userId)
        .then(user => {
          user.trips.push(result._id)
        })
      res.send(result);
    });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
})

module.exports = tripsRouter;
