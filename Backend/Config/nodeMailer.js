const nodemailer = require("nodemailer");

const nodeConfig = () => {
  return nodemailer.createTransport({
    host: process.env.NODE_HOST,
    port: process.env.NODE_PORT,
    secure: true,
    service: process.env.NODE_SERVICE,
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_PASS,
    },
  });
};

module.exports = nodeConfig;
