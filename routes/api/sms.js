const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { default: AxiosDigest } = require("axios-digest");
const { text } = require("express");

// not used

router.post("/sendOtp", async (req, res) => {
  const { number, msg } = req.body;
  const axios_digest = new AxiosDigest("admin", "admin1234");
  console.log(axios_digest);
  // console.log(process.env.DINSTAR_USER);
  console.log("request body", req.body);

  try {
    await axios_digest.post("http://10.128.50.222/api/send_sms", {
      text: msg,
      param: [{ number: number }],
    });

    res.status(200).send(msg);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
