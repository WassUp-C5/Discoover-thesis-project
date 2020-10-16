const authRouter = require("express").Router();
const User = require("../models/User");

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

module.exports = authRouter;
