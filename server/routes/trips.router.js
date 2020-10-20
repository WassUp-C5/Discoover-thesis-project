const tripsRouter = require("express").Router();
const Trip = require("../models/Trips");
const User = require("../models/User");

tripsRouter.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    var trip = new Trip(req.body.trip);
    await trip.save().then((result) => {
      console.log("trip saved successfully");
      User.findById(req.body.userId).then((user) => {
        user.trips.push(result._id);
        user.save();
      });
      res.send(result);
    });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});
// Don't delete this please get trip by id
// tripsRouter.get("/:id", (req, res) => {
//   let id = req.params.id;
//   console.log("id ======>", id);
//   Trip.findById(id, function (err, trip) {
//     if (err) throw err;
//     res.send(trip);
//     console.log("trip ===> ", trip);
//   });
// });
tripsRouter.get("/", (req, res) => {
  Trip.find({}, function (err, trip) {
    if (err) throw err;
    res.send(trip);
    console.log("trip ===> ", trip);
  });
});

module.exports = tripsRouter;
