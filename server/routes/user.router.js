const userRouter = require("express").Router();
const User = require("../models/User");
const Organizer = require("../models/Organizer");


userRouter.put("/edit", (req, res) => {
  let user = req.body;
  console.log('router section User log ==>', user);
  User.updateOne({ username: 'bjsaber' }, user)
    .then((result) => {
      res.send(result)
    })
    .catch(err => console.log(err))
})

userRouter.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

userRouter.get("/:id", (req, res) => {

  User.findOne({ _id: req.params.id })
    .then((user) => {

      user.getQualifications().then(qualifications =>{
        console.log(qualifications)
        user.qualifications = qualifications;
        res.send(user);
      })
      .catch(err => {
        console.log(err);
      })
      console.log(user);

    })
    .catch((err) => console.log(err));
});

userRouter.put("/guide/profile/edit", (req, res) =>{
  let user = req.body;

})

module.exports = userRouter;
