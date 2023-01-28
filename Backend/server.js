const app = require("./app");
const connectDatabase = require("./Config/database");
const nodeConfig = require("./Config/nodeMailer");

//Handling uncought exeption
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
});

//config
if (process.env.NODE_ENV === "PRODUCTION") {
  require("dotenv").config({ path: __dirname + "/Config/config.env" });
}
//Database Connection
connectDatabase();

//nodemailer
nodeConfig();

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port:" + process.env.PORT);
});

//unhandled promis rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection.");
  server.close(() => {
    process.exit;
  });
});
