const express = require("express");
const cors = require("cors");
const db = require("../db/config");
const path = require("path");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const tripsRouter = require("./routes/trips.router");
<<<<<<< HEAD
const proposalRouter = require("./routes/proposal.router");
=======
const guidesRouter = require("./routes/guides.router");
>>>>>>> Refactor: guide profile edit personal info

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "./../dist/DiscooverIn/"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/trips", tripsRouter);
<<<<<<< HEAD
app.use("/api/proposals", proposalRouter);
=======
app.use("/api/users/guides", guidesRouter);
>>>>>>> Refactor: guide profile edit personal info

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../dist/DiscooverIn/index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
