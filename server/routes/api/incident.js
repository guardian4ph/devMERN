const express = require("express");
const router = express.Router();
const path = require("path");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Incident = require("../../models/Incidents");

//@route POST api/incident
//@desc  Create incident
//@access Private

router.post(
  "/",
  [
    auth,
    //express validation -> body of the request
    check("type", "Type not should be blank").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructure the req.boby from post request
    const { user, type, scompleteaddress, scity, sstate, sarea, slat, slng } =
      req.body;

    try {
      let incident = await Incident.findOne({ type });

      let address = await Incident.findOne({ scompleteaddress });

      // include here date and time 20 max minutes comparison to check of duoble reporting

      if (incident && address) {
        // if (user || mail)
        return res
          .status(400)
          .json({ errors: [{ msg: "Incident already reported" }] });
      }

      incident = new Incident({
        user,
        type,
        scompleteaddress,
        scity,
        sstate,
        sarea,
        slat,
        slng,
      });

      await incident.save();

      res.json(incident);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/incident
//@desc  Get All incident
//@access Private

router.get("/", [auth], async (req, res) => {
  try {
    const incident = await Incident.find().populate("user", ["name", "lname"]);
    res.json(incident);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Get api/incident/:incident_id
//@desc  Get incidents by user id
//@access Public

router.get("/:incident_id", [auth], async (req, res) => {
  try {
    const incident = await Incident.findOne({
      incident: req.params._id,
    }).populate("user", ["name", "lname"]);

    if (!incident) return res.status(400).json({ msg: "Incident not found" });

    res.json(incident);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Incident not found ObjectId" });
    }
    res.status(500).send("Server Error");
  }
});

router.get("/me/:user_id", auth, async (req, res) => {
  try {
    //user varialble pertains at the profile schema user: type: mongoose.Schema.Types.ObjectId,
    const incident = await Incident.find({
      user: req.params.user_id,
    });
    console.log(" get incident by user", req.params.id);

    if (!incident) {
      return res
        .status(400)
        .json({ msg: "There is no incident reported for this user" });
    }

    res.json(incident);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/opcen/:opcen_id", auth, async (req, res) => {
  try {
    //user varialble pertains at the profile schema user: type: mongoose.Schema.Types.ObjectId,
    const incident = await Incident.find({
      opcen: req.params.opcen_id,
    });
    console.log(" get incident by user", req.params.id);

    if (!incident) {
      return res
        .status(400)
        .json({ msg: "There is no incident reported for this user" });
    }

    res.json(incident);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
