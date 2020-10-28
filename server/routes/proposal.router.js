const proposalsRouter = require("express").Router();
const Proposal = require("../models/Proposal");
const Trip = require("../models/Trips");
/*********** Add proposal *********** */
proposalsRouter.post("/add", async (req, res) => {
  try {
    var proposal = req.body;
    await Proposal.find(proposal).then(result => {
      if (result.length === 0) {
        newProp = new Proposal(proposal)
        newProp.save().then((result) => {
          res.send(result)
        })
      }
      else {
        res.send({ proposal: 'already hired' })
      }
    }
    )
  } catch (error) {
    res.status(400).send("error");
  }
});
/*****************Get proposals of specific organizer with his ID************ Works Fine ***************** */
proposalsRouter.get("/organizer/:organizerId", async (req, res) => {
  try {
    await Proposal.find(req.params).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.status(400).send("error");
  }
});
/*****************Get proposals of specific guide with his ID********** Works Fine ******************* */
proposalsRouter.get("/guide/:guideId", async (req, res) => {
  console.log("req.params should be  guideId something === > ", req.params);
  try {
    await Proposal.find(req.params).then((result) => {
      console.log(" this guides proposals ===> ", result);
      res.send(result);
    });
  } catch (error) {
    res.status(400).send("error");
  }
});
/* *********************************Get current proposal to guide profile when organizer access it************************************** */
proposalsRouter.get("/current/:guideId/:tripId", async (req, res) => {
  try {
    console.log('====================================');
    console.log('req params from get current prop : ', req.params);
    console.log('====================================');
    await Proposal.find(req.params).then((result) => {
      console.log(" this guides proposals ===> ", result);
      res.send(result);
    });
  } catch (error) {
    res.status(400).send("error");
  }
});
/*******************************Edit proposal with accepted state************************************* */
proposalsRouter.put("/guide/acceptance/:id", async (req, res) => {
  let id = req.params.id;
  Proposal.findById(id)
    .then((proposal) => {
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
