const travelersRouter = require("express").Router();
const User = require("../models/User");

travelersRouter.get("/:id", async (req, res) => {
  try{
    let traveler = await User.findById(req.params.id);
    res.send(traveler);
  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = travelersRouter;
