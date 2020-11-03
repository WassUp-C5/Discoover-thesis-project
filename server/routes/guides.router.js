const guidesRouter = require("express").Router();
const User = require("../models/User");
const Guide = require("./../models/Guide");
const Trips = require("./../models/Trips");
const UserQualifications = require("./../models/UserQualifications");
/**
 * Update one guide's personal info
 */
guidesRouter.put("/:id/edit", async (req, res) => {
  try {
    console.log(req.body);
    var result = await Guide.updateOne({ _id: req.params.id }, req.body);
    res.send(result);
    console.log(result);
  } catch (error) {
    res.status(500).send("Error !!");
    console.log(error);
  }
});

/**
 * Add new qualification
 */
guidesRouter.put("/:id/qualifications/add", async (req, res) => {
  try {
    User.findById(req.params.id).then((user) => {
      qualification = new UserQualifications(req.body);
      qualification.save();
      user.qualifications.push(qualification._id);
      user.save();
      res.send(user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something wrong happend !!!");
  }
});
/**
 * Get Guide by location
 */
guidesRouter.get("/location/:location", (req, res) => {
  Guide.find({ location: req.params.location }, function (err, guides) {
    if (err) console.log(err);
    res.send(guides);
  });
});
/**
 * Delete guide user one qualification
 */
guidesRouter.delete(
  "/:id/qualifications/:qualificationId/delete",
  async (req, res) => {
    try {
      let guide = await Guide.findById(req.params.id);
      guide.qualifications.pull(req.params.qualificationId);
      await UserQualifications.deleteOne({ _id: req.params.qualificationId });
      await guide.save();
      let result = await guide.populate("qualifications");
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something wrong happend !!!");
    }
  }
);

module.exports = guidesRouter;
