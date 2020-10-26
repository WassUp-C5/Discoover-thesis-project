const proposalsRouter = require("express").Router();
const { element } = require("protractor");
const Proposal = require("../models/Proposal");
const Trip = require("../models/Trips");
/*********** Add proposal *********** */
proposalsRouter.post("/add", async (req, res) => {
  try {
    console.log('proposal infos ====>', req.body);
    var proposal = req.body;
    console.log("this is proposal ===>", proposal);
    await Proposal.find(proposal).then(result => {

      console.log('result length ==>', result.length)
      if (result.length === 0) {
        newProp = new Proposal(proposal)
        console.log('proposal don\'t exist ===>', result)
        newProp.save().then((result) => {
          console.log("proposal saved =====>", result);
          res.send({ proposal: 'Hire request sent' })
        })


      }
      else {
        console.log('proposal exist and check gave ===>', result);
        res.send({ proposal: 'already hired' })
      }
    }
    )
  }




  catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});
/*****************Get proposals of specific organizer with his ID***************************** */
proposalsRouter.get("/organizer/:organizerId", async (req, res) => {
  try {
    console.log("req.params.id for organizerId", req.params);
    await Proposal.find(req.params).then((result) => {
      console.log("organizer proposals =====>", result);
      res.send(result);
    });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});
/*****************Get proposals of specific guide with his ID***************************** */
proposalsRouter.get("/guide/:guideId", async (req, res) => {
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
      res.send({ message: "proposal accepted modified " });
    })
    .catch((err) => console.log(err));
});
/*******************************Delet proposal by its ID************************************* */
proposalsRouter.delete("/delete/one/:id", async (req, res) => {
  let id = req.params.id;
  Proposal.findByIdAndDelete(id)
    .then((result) => {
      res.send({ message: "proposal deleted" });
    })
    .catch((err) => console.log(err));
});
/*******************************Delet proposal by trip ID************************************* */
proposalsRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  // Proposal.find({ tripId: id })
  //   .then((result) => {
  //     console.log('found ======>', result);
  //     result.forEach(elem => {
  //       Proposal.findByIdAndDelete(elem._id).then((res) => {
  //         res.send({ message: "proposal deleted" });
  //       })
  //         .catch((err) => console.log(err));
  //     })
  //     res.send({ message: "proposals deleted" });
  //   })
  Proposal.deleteMany({ tripId: id })
    .catch((err) => console.log(err));
});

module.exports = proposalsRouter;
