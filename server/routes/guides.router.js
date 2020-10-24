const guidesRouter = require("express").Router();
const Guide = require("./../models/Guide");

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

module.exports = guidesRouter;
