const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const OpcenProfile = require("../../models/OpcenProfile");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "D:/1App/client/public/opcenlogo");
  },
  filename: (req, file, callback) => {
    callback(null, "Pic" + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//@route POST api/opcenprofile
//@desc  Create or update user Profile
//@access Private

router.post(
  "/",
  upload.single("logo"),
  [
    auth,
    [
      //   check("mcontact", "Opcen mobile number required").isMobilePhone("en-PH"),

      //   check("telcontact", "Provide Landline contact").not().isEmpty(),
      check("status", "Especify if operational").not().isEmpty(),
      check("completeaddress", "Complete Address is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      const {
        logo,
        opcen,
        established,
        website,
        mcontact,
        telcontact,
        //Pulled in Map
        completeaddress,
        city,
        area,
        state,
        lat,
        lng,
        status, //active/disolved
        motto,
        opcenhistory,
        // Social Media
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = req.body;

      // Build Profile Object
      const profileFields = {};
      profileFields.user = req.user.id;

      if (logo) profileFields.logo = logo;
      if (opcen) profileFields.opcen = opcen;
      if (established) profileFields.established = established;
      if (website) profileFields.website = website;
      if (telcontact) profileFields.telcontact = telcontact;
      if (mcontact) profileFields.mcontact = mcontact;
      //Map Interactions
      if (completeaddress) profileFields.completeaddress = completeaddress;
      if (city) profileFields.city = city;
      if (area) profileFields.area = area;
      if (state) profileFields.state = state;
      if (lat) profileFields.lat = lat;
      if (lng) profileFields.lng = lng;

      if (status) profileFields.status = status;
      if (motto) profileFields.motto = motto;
      if (opcenhistory) profileFields.opcenhistory = opcenhistory;

      //Build Social Object
      profileFields.social = {};

      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      try {
        let opcen = await OpcenProfile.findOne({ user: req.user.id });
        if (opcen) {
          //Update

          opcen = await OpcenProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
          return res.json(opcen);
        }

        //Create
        opcen = new OpcenProfile(profileFields);
        await opcen.save();
        res.json(opcen);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    } else {
      const {
        opcen,
        established,
        website,
        telcontact,
        mcontact,
        //Pulled in Map
        completeaddress,
        city,
        area,
        state,
        lat,
        lng,
        status, //active/disolved
        motto,
        opcenhistory,
        // Social Media
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
      } = req.body;

      // Build Profile Object
      const profileFields = {};
      profileFields.user = req.user.id;
      profileFields.logo = req.file.filename;

      if (opcen) profileFields.opcen = opcen;
      if (established) profileFields.established = established;
      if (website) profileFields.website = website;
      if (telcontact) profileFields.telcontact = telcontact;
      if (mcontact) profileFields.mcontact = mcontact;
      //Map Interactions
      if (completeaddress) profileFields.completeaddress = completeaddress;
      if (city) profileFields.city = city;
      if (area) profileFields.area = area;
      if (state) profileFields.state = state;
      if (lat) profileFields.lat = lat;
      if (lng) profileFields.lng = lng;

      if (status) profileFields.status = status;
      if (motto) profileFields.motto = motto;
      if (opcenhistory) profileFields.history = opcenhistory;

      //Build Social Object
      profileFields.social = {};

      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      try {
        let opcen = await OpcenProfile.findOne({ user: req.user.id });
        if (opcen) {
          //Update

          opcen = await OpcenProfile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
          return res.json(opcen);
        }

        //Create
        opcen = new OpcenProfile(profileFields);
        await opcen.save();
        res.json(opcen);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }

    // res.send('AuthRoute')
  }
);

//@route POST api/opcenprofile/opcenprofiles
//@desc  get Opcen Profiles
//@access Private

router.get("/opcenprofiles", [auth], async (req, res) => {
  try {
    const opcenprofiles = await OpcenProfile.findOne().populate("opcen", [
      "name",
      "type",
      "category",
    ]);

    res.json(opcenprofiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/opcen_profile/profile/:opcen_id
//@desc  get Opcen Profile by id
//@access Private

router.get("/profile/:opcen_id", auth, async (req, res) => {
  try {
    const opcenprofile = await OpcenProfile.findOne({
      opcen: req.params.opcen_id,
    });

    if (!opcenprofile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this Opcen" });
    }
    res.json(opcenprofile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ msg: "Operation center not found ObjectId" });
    }
  }
});

module.exports = router;
