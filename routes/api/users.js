const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

//@route POST api/users
//@desc  Register User
//@access Public

router.post(
  "/",
  [
    //express validation -> body of the request
    check("name", "Name should be blank").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("number", "Please a valid Philippines mobile number").isMobilePhone(
      "en-PH"
    ),
    check(
      "password",
      "Please enter a password with 8 or more character"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the req.boby from post request
    const { name, email, number, password } = req.body;

    try {
      // See if the user exist, if exist sent error by filtering email and mobile number
      let user = await User.findOne({ email });
      //check also the email
      // const mail = await User.findOne({email})

      if (user) {
        // if (user || mail)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //Get user Gravar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        number,
        avatar,
        password,
      });

      //Encrypt the password
      //variable to set the encrption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return JsonWebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );

      // res.send('User Added')
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
