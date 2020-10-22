const tripsRouter = require("express").Router();
const Trip = require("../models/Trips");
const User = require("../models/User");
/****************Add a Trip******************************* */
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

/**********Get All The Trips************** */
tripsRouter.get("/", (req, res) => {
  Trip.find({}, function (err, trip) {
    if (err) throw err;
    res.send(trip);
    console.log("trip ===> ", trip);
  });
});

/***********************Get trip by id***************************/
tripsRouter.get("/:id", (req, res) => {
  Trip.findOne({ _id: req.params.id }, function (err, trip) {
    if (err) throw err;
    res.send(trip);
    console.log("trip ===> ", trip);
  });
});
/****************Update trip  ******************** */
tripsRouter.put("/:id/edit", (req, res) => {
  let id = req.params.id;
  console.log("router section organizer log ==>", req.body);
  Trip.updateOne({ _id: id }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

/***********************Delete trip by id***************************/
tripsRouter.delete("/:id", (req, res) => {
  Trip.deleteOne({ _id: req.params.id }, function (err) {
    if (err) throw err;
    // res.send('trip deleted');
    console.log("trip deleted");
  });
});
module.exports = tripsRouter;
