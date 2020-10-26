const userRouter = require("express").Router();
const User = require("../models/User");
const Trip = require("../models/Trips");
const bcrypt = require("bcryptjs");

/****************Update Organizer Profile ******************** */
userRouter.put("/organizer/edit", (req, res) => {
  let user = req.body;
  console.log("router section organizer log ==>", user);
  User.updateOne({ username: user.username }, user)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
/*******************Get the organizer info*********************************** */
userRouter.get("/organizer/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

/*************Get all the organizer's Trips******************** */

userRouter.get("/organizer/trips/:id", (req, res) => {
  let id = req.params.id;
  console.log("user ID ======>", id);
  User.findOne({ _id: id }).then((user) => {
    console.log("user trips ===>", user.trips);
    Trip.find({ _id: user.trips })
      .then((result) => {
        res.send(result);
        console.log("result =============>", result);
      })
      .catch((err) => console.log(err));
  });
});

/****************Get guide info********************* */
userRouter.get("/guide/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate("userQualifications")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
/****************Update Guide Profile ******************** */
userRouter.put("/guide/edit", (req, res) => {
  let user = req.body;
  console.log("router section guide log ==>", user);
  User.updateOne({ username: user.username }, user)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

/************************Get the guides list***************/
userRouter.get("/guides", (req, res) => {
  User.find({ roles: "guide" })
    .then((result) => {
      res.send(result);
      console.log("result ===>", result);
    })
    .catch((err) => console.log(err));
});

/**
 * Change user password
 */
userRouter.put("/:id/password/edit", async (req, res) => {
  try {
    User.findById(req.params.id)
    .then(user => {
      if (!bcrypt.compareSync(req.body.currentPassword, user.password)) {
        return res
          .status(401)
          .json({ message: "Please verify your password!!"});
      }

      user.password = req.body.newPassword;
      user.save();
      res.send({message: "Success: your password has been changed!!"})
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "An error occured please try again!!"});
  }
});

module.exports = userRouter;
