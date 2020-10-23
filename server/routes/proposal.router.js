const proposalsRouter = require("express").Router();
const Proposal = require("../models/Proposal");
const Trip = require("../models/Trips");
/*********** Add proposal *********** */
proposalsRouter.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    var proposal = new Proposal(req.body);
    console.log("this is proposal ===>", proposal);
    await proposal.save().then((result) => {
      console.log("proposal saved =====>", result);
    });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});
/*****************Get proposals of specific guide with his ID***************************** */
proposalsRouter.get("/proposals/:guideId", async (req, res) => {
  try {
    console.log("req.params.id for guidId", req.params);
    await Proposal.find(req.params).then((result) => {
      console.log("guide proposals =====>", result);
      res.send(result);
    });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});
module.exports = proposalsRouter;
