const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { default: AxiosDigest } = require("axios-digest");
const { text } = require("express");
const Otpass = require("../../models/Otpass");

// not used

router.post("/sendOtp", async (req, res) => {
  const { user, number, name, msg, otp } = req.body;

  // encrypt OTP
  const salt = await bcrypt.genSaltSync(10);
  // otp = await bcrypt.hash(otp, salt);

  // create OTP object
  const otpFields = {};

  otpFields.user = user;

  if (number) otpFields.number = number;
  if (name) otpFields.name = name;
  if (msg) otpFields.msg = msg;
  // if (otp) otpFields.otp = await bcrypt.hash(otp, salt);
  if (otp) otpFields.otp = otp;

  // connect to sms Gateway
  const axios_digest = new AxiosDigest(
    process.env.DINSTAR_USER,
    process.env.DINSTAR_PASS
  );
  console.log(axios_digest);
  // console.log(process.env.DINSTAR_USER);
  console.log("request body", req.body);

  try {
    await axios_digest.post(process.env.DINSTAR_ENDPOINT + "/api/send_sms", {
      text: msg,
      param: [{ number: number }],
    });

    let otpass = await Otpass.findOne({ number });

    if (otpass) {
      // update
      otpass = await Otpass.findOneAndUpdate(
        { user: user },
        { $set: otpFields },
        { new: true }
      );
      return res.json(otpass);
    }
    // Create
    otpass = new Otpass(otpFields);
    await otpass.save();
    res.json(otpass);

    // res.status(200).send(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
