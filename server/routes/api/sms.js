const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Otpass = require("../../models/Otpass");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { default: AxiosDigest } = require("axios-digest");

// Send OTP

router.post("/sendOtp", async (req, res) => {
  const { user, number, name, msg, otp } = req.body;

  // encrypt OTP
  const salt = await bcrypt.genSaltSync(10);
  // otp = await bcrypt.hash(otp, salt);

  // create OTP object
  const otpFields = {};

  if (user) otpFields.user = user;

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
    res.status(500).send("Server Error");
  }
});

// Verify OTP if match in db
router.post(
  "/onMatch",

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the req.boby from post request
    const { number, sent_otp } = req.body;

    try {
      // See if the user exist, if exist sent error by filtering email and mobile number
      let user = await Otpass.findOne({ number });
      //check also the email
      // const mail = await User.findOne({email})

      if (user) {
        if (user.otp === sent_otp) {
          return res.status(200).json(user.id);
        }
      }

      //Check is password is a match

      return res.status(400).json({ errors: [{ msg: "OTP did not matched" }] });

      // res.send('User Added')
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// Update user

router.post("/changepassword", async (req, res) => {
  const { id, name, lname, number, email, password } = req.body;

  const UserFields = {};

  if (id) UserFields.id = id;

  // if (name) UserFields.name = name;
  // if (lname) UserFields.lname = lname;
  // if (number) UserFields.number = number;
  // if (email) UserFields.email = email;
  // create Hash the password

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  if (password) UserFields.password = hash;

  try {
    let user = await User.findOne({ number });

    if (user) {
      // update
      user = await User.findOneAndUpdate(
        { number: number },
        { $set: UserFields },
        { new: true }
      );

      const payload = {
        user: {
          id: id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 259200 },
        (err, token) => {
          if (err) throw err;

          res.json({ token }).send("Token Loaded");
        }
      );
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
