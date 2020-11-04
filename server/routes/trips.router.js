const tripsRouter = require("express").Router();
const Trip = require("../models/Trips");
const User = require("../models/User");
const TripReservation = require("../models/TripReservation");


/****************Add a Trip**************** WORKS FINE *************** */
tripsRouter.post("/add", async (req, res) => {
  try {
    var trip = new Trip(req.body.trip);
    trip.organizerId = req.body.organizerId;
    console.log(trip.date.toISOString().split("T")[0]);
    trip.date = trip.date.toISOString().split("T")[0];

    console.log("====================================");
    console.log("new trip value is : ==>", trip.value);
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

/**********Get All published Trips************** */
tripsRouter.get("/public", (req, res) => {
  Trip.find({ published: true }, function (err, trip) {
    if (err) throw err;
    res.send(trip);
  });
});

/***********************Get trip by id***************************/
tripsRouter.get("/:id", async (req, res) => {
  try {
    let trip = await Trip.findOne({ _id: req.params.id })
      .populate({
        path: "reservations",
        populate: { path: "traveler" },
      })
      .populate("organizer")
      .populate({ path: "reservations", populate: { path: "traveler" } })
      .populate("travelers")
      .populate("waitingList")
      .populate("guides");
    console.log(trip);
    res.send(trip);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something wrong happend!!");
  }
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
/**
 * Book a trip
 */
/******************Update trip by adding a new tripper************************** */
tripsRouter.put("/add/triper/:tripID", async (req, res) => {
  try {
    let user = await User.findById(req.body.triperID);
    let trip = await Trip.findById(req.params.tripID);
    let tripReservation = new TripReservation({
      traveler: user._id,
      trip: trip._id,
    });
    //Update data
    user.tripReservations.push(tripReservation._id);
    trip.reservations.push(tripReservation._id);
    trip.waitingList.push(user._id);
    //Save data
    await tripReservation.save();
    await user.save();
    await trip.save();
    //populate needed fields
    await trip
      .populate({
        path: "reservations",
        populate: { path: "traveler" },
      })
      .populate("organizerId");
    //send back the trip
    res.send(trip);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something wrong happend!!" });
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
/**
 * Confirm traveler reservation
 */
tripsRouter.put(
  "/:id/reservations/:reservationId/confirm",
  async (req, res) => {
    try {
      let trip = await Trip.findById(req.params.id);
      let traveler = await User.findById(req.body.reservation.traveler_id);
      if (!trip.travelers.includes(traveler._id)) {
        trip.travelers.push(traveler._id);
        trip.waitingList.pull(traveler._id);
        await trip.save();
        await TripReservation.updateOne(
          { _id: req.params.reservationId },
          { confirmed: true }
        );
        res.send(trip);
      } else {
        res
          .status(500)
          .send({ message: "traveler already in travelers list!!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Somthing worng happend!!");
    }
  }
);

/**
 * Cancel trip reservation, this function will do the next:
 *  1. Delete the trip reservation from tripsReservations collection
 *  2. Delete refrence for the reservation id from reservations array in the trips collection
 *  3. Delete refrence for the reservation id from tripReservation in the users collection
 */
/**************Update Trip to remove the travelers Id from trip ********************************* */
tripsRouter.put(
  "/:id/travelers/:travelerId/reservations/cancel",
  async (req, res) => {
    try {
      let trip = await Trip.findById(req.params.id); // get trip from db
      let traveler = await User.findById(req.params.travelerId); // get traveler from db
      let tripReservation = await TripReservation.findOne({
        trip: trip._id,
        traveler: traveler._id,
      });
      console.log("====================================");
      console.log(tripReservation);
      console.log("====================================");
      trip.reservations.pull(tripReservation._id); // delete the traveler from the travelers list of the trip
      traveler.tripReservations.pull(tripReservation._id);
      trip.travelers.pull(traveler._id);
      trip.waitingList.pull(traveler._id);
      let reservationId = tripReservation._id;
      await TripReservation.findOneAndDelete({ _id: reservationId });
      await traveler.save();
      await trip.save();
      await trip
        .populate({
          path: "reservations",
          populate: { path: "traveler" },
        })
        .populate("organizerId");
      await res.send(trip);
    } catch (error) {
      console.log(error);
      res.status.send("Something wrong happend!!");
    }
    // let tripperID = req.body.triperID;
    // let tripID = req.params.id;
    // Trip.findById(tripID)
    //   .then((trip) => {
    //     trip.travelers.pull(tripperID);
    //     trip.save();
    //     res.send({ message: "traveler  deleted" });
    //   })
    //   .catch((err) => console.log(err));
  }
);
/****************Update trip to be published  **************  */
tripsRouter.put("/publish/:id", async (req, res) => {
  try{
    console.log(req.body);
    let tripId = req.params.id;
    let updatedTrip = await Trip.findOneAndUpdate({ _id: tripId }, req.body,{
      new: true
    });
    console.log('====================================');
    console.log(updatedTrip);
    console.log('====================================');
    res.send(updatedTrip);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).send("Somthing wrong happend!!");
  }
});

/**************Update Trip with guide id when he accepts  ********************************* */
tripsRouter.put("/edit/:id", (req, res) => {
  let id = req.params.id;
  let guideId = req.body.guide;
  console.log("logging guide id and trip id ==>", id, guideId);
  Trip.findById(id)
    .then((trip) => {
      console.log("trip ===>", trip);
      if (trip.guides.includes(guideId)) {
        res.send({ message: "guide already added" });
      } else {
        trip.guides.push(guideId);
        trip.save();
        res.send({ message: "guide  added" });
      }
    })
    .catch((err) => console.log(err));
});
/**************Update Trip to remove the guide Id from guides ********************************* */
tripsRouter.put("/rmGuide/:id", (req, res) => {
  let tripId = req.params.id;
  let guideId = req.body.guideId;
  console.log("logging guide array and trip id ==>", tripId, guideId);
  Trip.findById(tripId)
    .then((trip) => {
      trip.guides.pull(guideId);
      console.log("trip to delete the guide from array ===>", trip);
      trip.save();
      res.send({ message: "guide  deleted" });
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
