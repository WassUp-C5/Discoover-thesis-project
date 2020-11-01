const tripsRouter = require("express").Router();
const Trip = require("../models/Trips");
const User = require("../models/User");
const TripReservation = require("../models/TripReservation");


/****************Add a Trip**************** WORKS FINE *************** */
tripsRouter.post("/add", async (req, res) => {
  try {
    var trip = new Trip(req.body.trip);
    trip.organizerId = req.body.organizerId;
    console.log("====================================");
    console.log("organizerId is : ==>", trip.organizerId);
    console.log("====================================");
    await trip.save().then((result) => {
      User.findById(trip.organizerId).then((user) => {
        user.trips.push(trip._id.toString());
        user.save().then((result) => {
          console.log("trip saved successfully");
          res.send(result);
        });
      });
    });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});

/***********************Get trip by location***************************/
tripsRouter.get("/location/:location", (req, res) => {
  console.log("****this console ==>", req.params.location);
  Trip.find({ location: req.params.location }, function (err, trip) {
    if (err) throw err;
    console.log("location bodyparse  ===> ", trip);
    res.send(trip);
  });
});

/**********Get All The Trips************** */
tripsRouter.get("/public", (req, res) => {
  Trip.find({ published: true }, function (err, trip) {
    if (err) throw err;
    res.send(trip);
  });
});

/***********************Get trip by id***************************/
tripsRouter.get("/:id", (req, res) => {
  Trip.findOne({ _id: req.params.id }, function (err, trip) {
    if (err) throw err;
    res.send(trip);
  });
});
/****************Update trip  ******************** */
tripsRouter.put("/:id/edit", (req, res) => {
  let id = req.params.id;
  Trip.updateOne({ _id: id }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
/******************Update trip by adding a new tripper************************** */
tripsRouter.put("/add/triper/:tripID", async (req, res) => {
  try{
    let user = await User.findById(req.body.triperID);
    let trip = await Trip.findById(req.params.tripID);
    let tripReservation = new TripReservation({traveler: user._id,trip: trip._id });
    tripReservation.save();
    user.tripReservations.push(tripReservation._id);
    user.save();
    trip.travelers.push(user._id);
    trip.save();
    res.send(trep);
  }
  catch(error){
    console.log(error);
    res.status(500).send({message: 'Something wrong happend!!'})
  }
  // let tripId = req.params.tripID;
  // console.log("tripId", tripId);
  // let tripperId = req.body.triperID;
  // console.log("tripperId", tripperId);
  // Trip.findById(tripId)
  //   .then((trip) => {
  //     if (trip.travelers.length === trip.maxTravelers) {
  //       res.send({ message: "The trip reach his max of travelers" });
  //     } else if (trip.travelers.includes(tripperId)) {
  //       res.send({ message: "Traveler already added " });
  //     } else {
  //       trip.travelers.push(tripperId);
  //       trip.save();
  //       res.send({ message: "Travelers added " });
  //     }
  //   })
  //   .catch((err) => console.log(err));
});
/****************Update trip to be published  **************  */
tripsRouter.put("/publish/:id", (req, res) => {
  let tripId = req.params.id;
  console.log("====================================");
  console.log("req.body ====>", req.body);
  console.log("tripId ====>", tripId);
  console.log("====================================");
  Trip.updateOne({ _id: tripId }, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

/**************Update Trip with guide id when he accepts  ********************************* */
tripsRouter.put("/edit/:id", (req, res) => {
  let id = req.params.id;
  let guideId = req.body.guide;
  console.log("logging guide id and trip id ==>", id, guideId);
  Trip.findById(id)
    .then((trip) => {
      console.log("trip ===>", trip);
      if (trip.guide.includes(guideId)) {
        res.send({ message: "guide already added" });
      } else {
        trip.guide.push(guideId);
        trip.save();
        res.send({ message: "guide  added" });
      }
    })
    .catch((err) => console.log(err));
});
/**************Update Trip to remove the guide Id from guide ********************************* */
tripsRouter.put("/rmGuide/:id", (req, res) => {
  let tripId = req.params.id;
  let guideId = req.body.guideId;
  console.log("logging guide array and trip id ==>", tripId, guideId);
  Trip.findById(tripId)
    .then((trip) => {
      trip.guide.pull(guideId);
      console.log("trip to delete the guide from array ===>", trip);
      trip.save();
      res.send({ message: "guide  deleted" });
    })
    .catch((err) => console.log(err));
});

/**************Update Trip to remove the travelers Id from trip ********************************* */
tripsRouter.put("/rmTripper/:id", (req, res) => {
  let tripperID = req.body.triperID;
  let tripID = req.params.id;
  Trip.findById(tripID)
    .then((trip) => {
      trip.travelers.pull(tripperID);
      trip.save();
      res.send({ message: "traveler  deleted" });
    })
    .catch((err) => console.log(err));
});
/***********************Get trip by date***************************/
tripsRouter.get("/date/:date", (req, res) => {
  console.log("this console ==>", req.params.date);
  Trip.find({ date: req.params.date }, function (err, trip) {
    if (err) throw err;
    console.log("trip DATE===> ", trip);
    res.send(trip);
  });
});

/***********************Delete trip by id***************************/
tripsRouter.delete("/delete/:id/:organizerId", (req, res) => {
  User.findById(req.params.organizerId).then((user) => {
    user.trips.pull(req.params.id);
    user.save().then((result) => {
      Trip.deleteOne({ _id: req.params.id }, function (err, data) {
        if (err) throw err;
        console.log("trip deleted");

        res.send(result);
      });
    });
  });
});

module.exports = tripsRouter;
