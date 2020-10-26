const guidesRouter = require("express").Router();
const User = require("../models/User");
const Guide = require("./../models/Guide");
const UserQualification = require("./../models/UserQualifications");
/**
 * Update one guide's personal info
 */
guidesRouter.put("/:id/edit", async (req, res) => {
  try{
    console.log(req.body);
    var result = await Guide.updateOne({_id: req.params.id}, req.body);
    res.send(result);
    console.log(result);
  }
  catch(error){
    res.status(500).send("Error !!");
    console.log(error)
  }
});

/**
 * Add new qualification
 */
// guidesRouter.post("/:id/qualifications/add", async (req, res) =>{
//   try {
//     User.findById(req.params.id)
//     .then(user => {

//     });
//   }
//   catch(error) {
//     console.log(error);
//     res.status(500).send("Something wrong happend !!!");
//   }
// });

module.exports = guidesRouter;
