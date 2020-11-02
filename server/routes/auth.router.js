const authRouter = require("express").Router();
const User = require("../models/User");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {  dataUri } = require('./../middlewares/multerUpload');
const { uploader } = require('./../config/cloudinaryConfig');


/*****************Create a new user **************************** */
authRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  try {

    if(req.file) {
      const file = dataUri(req).content;
      return uploader.upload(file)
              .then( async (result) => {
                var userData = JSON.parse(req.body.user);
                userData.avatar = result.url;
                var user = new User(userData);
                await user.saveUser();
                console.log('Your image has been uploded successfully to cloudinary');
                return res
                        .status(200)
                        .json({
                          messge: 'Your account has been created successfully',
                        })
              })
              .catch((err) =>
                res
                .status(400)
                .json({
                  messge: 'someting went wrong while processing your request',
                  data: {
                    err
                  }
                })
              )
    }




    // console.log(req.body);

    // var user = new User(req.body);
    // await user.saveUser().then((result) => {
    //   console.log("success");
    //   res.send(result);
    // });
  } catch (error) {
    console.log("error ===> ", error);
    res.status(400).send("error");
  }
});
/********************Sign In******************************************** */
authRouter.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    var user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user) {
      return res
        .status(401)
        .json({ message: "Please check your credentials!!" });
    }
    bcrypt.compare(req.body.password, user.password, (err, compRes) => {
      if (err) {
        console.log(err);
      }
      if (!compRes) {
        console.log("Wrong Password");
        return res
          .status(401)
          .json({ message: "Please check your credentials!!" });
      } else {
        let token = jwt.sign({ userId: user._id }, "it's a secret");
        res.status(200).json({
          token: token,
          user: { id: user._id, roles: user.roles },
        });
        // console.log(bcrypt.compareSync(req.body.password, user.password))
        // console.log(user);
      }
    });

    //   console.log("Wrong Password")
    //   return res
    //     .status(401)
    //     .json({ title: "log in failed", error: "invalid data" });
    // }
    // let token = jwt.sign({ userId: user._id }, "it's a secret");
    // res.status(200).json({
    //   token: token,
    //   user: { id: user._id, roles: user.roles },
    // });
    // console.log(bcrypt.compareSync(req.body.password, user.password))
    // console.log(user);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

module.exports = authRouter;
