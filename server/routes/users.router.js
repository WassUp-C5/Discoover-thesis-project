const usersRouter = require("express").Router();
const User = require("../models/User");
const Trip = require("../models/Trips");
const bcrypt = require("bcryptjs");
const { dataUri } = require("./../middlewares/multerUpload");
const { uploader } = require("./../config/cloudinaryConfig");

/*******************Get the organizer by idq*********************************** */
usersRouter.get("/organizers/:id", (req, res) => {
  console.log("====================================");
  console.log("req.params line 9 : ", req.params);
  console.log("====================================");
  User.findOne({ _id: req.params.id })
    .then((result) => {
      console.log("====================================");
      console.log(
        "result to be send with org data after editing and on init == ",
        result
      );
      console.log("====================================");
      res.send(result);
    })
    .catch((err) => console.log(err));
});

/**
 * Update user photo
 */
usersRouter.put("/:id/edit/avatar", async (req, res) => {
  try {
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then(async (result) => {
        await User.updateOne({_id: req.params.id}, {avatar: result.url});
        return res.status(200).json({
          messge: "Your file has been saved successfully",
        });
      })
      .catch((err) =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        })
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Something wrong happend!!");
  }
});

/****************Update Organizer Profile ******************** */
usersRouter.put("/organizer/edit", (req, res) => {
  let user = req.body;
  console.log("router section organizer log ==>", user);
  User.updateOne({ username: user.username }, user)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

/*************Get all the organizer's Trips********* Works Fine *********** */

usersRouter.get("/organizers/:id/trips", (req, res) => {
  let id = req.params.id;
  var ObjectId = require("mongoose").Types.ObjectId;
  var query = { organizer: new ObjectId(id) };

  console.log("user ID ======>", id);
  Trip.find(query, function (err, trips) {
    if (err) throw err;
    console.log("organizer trips to be shown  ===> ", trips);
    res.send(trips);
  });
});

/****************Get guide info********************* */
usersRouter.get("/guides/:id", (req, res) => {
  console.log("guide id: ", req.params.id);
  User.findById(req.params.id)
    .populate("qualifications")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
/****************Update Guide Profile ******************** */
usersRouter.put("/guides/edit", (req, res) => {
  let user = req.body;
  console.log("router section guide log ==>", user);
  User.updateOne({ username: user.username }, user)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

/************************Get the guides list***************/
usersRouter.get("/guides", (req, res) => {
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
usersRouter.put("/:id/password/edit", async (req, res) => {
  try {
    User.findById(req.params.id).then((user) => {
      if (!bcrypt.compareSync(req.body.currentPassword, user.password)) {
        return res
          .status(401)
          .json({ message: "Please verify your password!!" });
      }

      user.password = req.body.newPassword;
      user.save();
      res.send({ message: "Success: your password has been changed!!" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "An error occured please try again!!" });
  }
});

module.exports = usersRouter;
