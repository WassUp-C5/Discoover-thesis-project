const authRouter = require("express").Router();
const User = require("../models/User");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    var user = new User(req.body);
    await user.save().then((result) => {
      console.log("success");
      res.send(result);
    });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    var user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res
        .status(401)
        .json({ title: "server side error", error: "invalid" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res
        .status(401)
        .json({ title: "log in failed", error: "invalid data" });
    }
    let token = jwt.sign({ userId: user._id }, "Between Us Nigga");
    res.status(200).json({
      title: "Authentication successful",
      token: token,
      id: user.id,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

module.exports = authRouter;
