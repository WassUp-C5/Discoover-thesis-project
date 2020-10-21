

const userRouter = require("express").Router();
const User = require("../models/User");


userRouter.put("/organizer/edit", (req, res) => {
  let user = req.body;
  console.log('router section organizer log ==>', user);
  User.updateOne({ username: user.username }, user)
    .then((result) => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

userRouter.get('/organizer/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

userRouter.get("/guide/:id", (req, res) => {

  User.findOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
});

userRouter.put("/guide/edit", (req, res) => {
  let user = req.body;
  console.log('router section guide log ==>', user);
  User.updateOne({ username: user.username }, user)
    .then((result) => {
      res.send(result)
    })
    .catch(err => console.log(err))

})

module.exports = userRouter;
