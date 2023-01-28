const express = require("express");
const errorMiddleware = require("./Middleware/errorMiddleware");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: __dirname + "/Config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes import
const contest = require("./Routes/contestRoutes");
const user = require("./Routes/userRoutes");
const event = require("./Routes/eventRoutes");
const post = require("./Routes/postRoutes");
const slider = require("./Routes/sliderRoutes");
const payment = require("./Routes/PaymentRoutes");
const meet = require("./Routes/meetRutes");
app.use("/api/v1", contest);
app.use("/api/v1", user);
app.use("/api/v1", event);
app.use("/api/v1", post);
app.use("/api/v1", slider);
app.use("/api/v1", payment);
app.use("/api/v1", meet);

if (process.env.NODE_ENV === "PRODUCTION_SSH") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

//Middlewre for error
app.use(errorMiddleware);

module.exports = app;
