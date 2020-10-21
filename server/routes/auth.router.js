const authRouter = require("express").Router();
const User = require("../models/User");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/*****************Create a new user **************************** */
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
/********************Sign In******************************************** */
authRouter.post("/signin", async (req, res) => {
  console.log(req.body);
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
    let token = jwt.sign({ userId: user._id }, "it's a secret");
    res.status(200).json({
      token: token,
      user: { id: user._id, roles: user.roles },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

module.exports = authRouter;
