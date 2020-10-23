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
/****************Update trip  ************** To be edited so it send a proposal to the guide before updating DB****** */
tripsRouter.put("/:id/edit", (req, res) => {
  let id = req.params.id;
  let guideId = req.body.guide;
  console.log("logging guide id and trip id ==>", id, guideId);
  Trip.updateOne({ _id: id }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
/**************Update Trip to add a guide ********************************* */
tripsRouter.put("/edit/:id", (req, res) => {
  let id = req.params.id;
  let guideId = req.body.guide;
  console.log("logging guide id and trip id ==>", id, guideId);
  Trip.findById(id)
    .then((trip) => {
      console.log("trip ===>", trip);
      trip.guide.push(guideId);
      trip.save();
      res.send({ message: "guide  added" });
    })
    .catch((err) => console.log(err));
});
/***********************Get trip by location***************************/
tripsRouter.get("/:location", (req, res) => {
  console.log('this console ==>', req.params.location)
  Trip.findOne({ location: req.params.location }, function (err, trip) {
    if (err) throw err;
    res.send(trip);
    console.log("trip ===> ", trip);
  });
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
