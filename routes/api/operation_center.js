const express = require("express");
const router = express.Router();

const config = require("config");
const auth = require("../../middleware/auth");

const { check, validationResult } = require("express-validator");
const Operation_Center = require("../../models/Operation_Center");

//@route POST api/operation_center
//@desc  Register Operation Center
//@access Public

router.post(
  "/",
  [
    auth,
    //express validation -> body of the request
    check("name", "Name not should be blank").not().isEmpty(),
    check("category", "Category not should be blank").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the req.boby from post request
    const { name, category, description } = req.body;

    try {
      // See if the user exist, if exist sent error by filtering email and mobile number
      let opcen = await Operation_Center.findOne({ name });

      if (opcen) {
        // if (user || mail)
        return res
          .status(400)
          .json({ errors: [{ msg: "Operation Center already exists" }] });
      }

      opcen = new Operation_Center({
        name,
        category,
        description,
      });

      await opcen.save();

      res.send("Operation Center Added");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
