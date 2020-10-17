const userRouter = require("express").Router();
const User = require("../models/User");
const Organizer = require("../models/Organizer");


userRouter.put('/edit', (req, res) => {
  let user = req.body;
  User.updateOne({ username: user.username }, user)
    .then((result) => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

module.exports = userRouter;
