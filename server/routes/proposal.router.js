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
proposalsRouter.get("/:guideId", async (req, res) => {
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
/*******************************Edit proposal with accepted state************************************* */
proposalsRouter.put("/edit/:id", async (req, res) => {
  let id = req.params.id;
  Proposal.findById(id)
    .then((proposal) => {
      console.log("proposal ===>", proposal);
      proposal.accepted = req.body.accepted;
      proposal.save();
      res.send({ message: "proposal accepted modified to true" });
    })
    .catch((err) => console.log(err));
});
/*******************************Delet proposal ************************************* */
proposalsRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  Proposal.findByIdAndDelete(id)
    .then((result) => {
      res.send({ message: "proposal deleted" });
    })
    .catch((err) => console.log(err));
});

module.exports = proposalsRouter;
