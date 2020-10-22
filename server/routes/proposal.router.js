const proposalsRouter = require("express").Router();
const Proposal = require("../models/Proposal");

/*********** Add proposal *********** */
proposalsRouter.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    var proposal = new Proposal(req.body);
    console.log('this is proposal ===>', proposal);
    await proposal.save().then(result => {
      console.log("proposal saved =====>", result);
    })
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
})
module.exports = proposalsRouter;
