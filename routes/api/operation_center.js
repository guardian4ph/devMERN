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
    const { user, name, category, description, type } = req.body;

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
        user,
        name,
        category,
        description,
        type,
      });

      await opcen.save();

      res.json(opcen);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/operation_center/myopcen
//@desc  Get Current user Profile
//@access Private

router.get("/myopcen/:user_id", auth, async (req, res) => {
  try {
    //user varialble pertains at the profile schema user: type: mongoose.Schema.Types.ObjectId,
    const opcen = await Operation_Center.find({
      user: req.params.user_id,
    }).sort({ date: -1 });

    if (!opcen) {
      return res.status(400).json({ msg: "There is no opcen for this user" });
    }

    res.json(opcen);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ msg: "Operation center not found ObjectId" });
    }
  }
});

router.get("/myopcen/:user/:_id", auth, async (req, res) => {
  console.log("hit");
  try {
    //user varialble pertains at the profile schema user: type: mongoose.Schema.Types.ObjectId,
    const opcen = await Operation_Center.findOne({
      _id: req.params._id,
    });

    if (!opcen) {
      return res.status(400).json({ msg: "There is no opcen for this user" });
    }

    res.json(opcen);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ msg: "Operation center not found ObjectId" });
    }
  }
});

module.exports = router;
