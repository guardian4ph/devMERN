const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const multer = require("multer");
const path = require("path");

const { check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "D:/1App/client/public/img");
  },
  filename: (req, file, callback) => {
    callback(null, "Pic" + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//@route POST api/profile
//@desc  Create or update user Profile
//@access Private

router.post(
  "/",
  upload.single("profilepic"),
  [
    auth,
    [
      check("gender").not().isEmpty().withMessage("Gender is required"),
      check("civilstatus", "Civil status is required").not().isEmpty(),
      check("birthday", "Birthday is required").not().isEmpty(),
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
        organization,
        gender,
        civilstatus,
        birthday,
        completeaddress,
        profilepic,
        state,
        city,
        area,
        lat,
        lng,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,

        //Emergency Info
        contactperson,
        relationship,
        contactnumber,
        eaddress,
        bloodtype,
        insured,
      } = req.body;

      // Build Profile Object
      const profileFields = {};
      profileFields.user = req.user.id;

      if (profilepic) profileFields.profilepic = profilepic;
      if (gender) profileFields.gender = gender;
      if (civilstatus) profileFields.civilstatus = civilstatus;
      if (birthday) profileFields.birthday = birthday;

      //Map Interactions
      if (completeaddress) profileFields.completeaddress = completeaddress;
      if (city) profileFields.city = city;
      if (area) profileFields.area = area;
      if (state) profileFields.state = state;
      if (lat) profileFields.lat = lat;
      if (lng) profileFields.lng = lng;

      if (organization) profileFields.organization = organization;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;

      if (skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
      }

      //Build Social Object
      profileFields.social = {};

      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      // Build Emergency Object
      profileFields.emergencyinfo = {};
      if (contactperson)
        profileFields.emergencyinfo.contactperson = contactperson;
      if (relationship) profileFields.emergencyinfo.relationship = relationship;
      if (contactnumber)
        profileFields.emergencyinfo.contactnumber = contactnumber;
      if (eaddress) profileFields.emergencyinfo.eaddress = eaddress;
      if (bloodtype) profileFields.emergencyinfo.bloodtype = bloodtype;
      if (insured) profileFields.emergencyinfo.insured = insured;

      try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
          //Update

          profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
          return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    } else {
      const {
        organization,
        gender,
        civilstatus,
        birthday,
        completeaddress,
        state,
        city,
        area,
        lat,
        lng,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        // profilepic,
        //Emergency Info
        contactperson,
        relationship,
        contactnumber,
        eaddress,
        bloodtype,
        insured,
      } = req.body;

      // Build Profile Object
      const profileFields = {};
      profileFields.user = req.user.id;
      profileFields.profilepic = req.file.filename;

      // if (profilepic) profileFields.profilepic = req.file.filename;
      if (gender) profileFields.gender = gender;
      if (civilstatus) profileFields.civilstatus = civilstatus;
      if (birthday) profileFields.birthday = birthday;
      //Map Interactions
      if (completeaddress) profileFields.completeaddress = completeaddress;
      if (city) profileFields.city = city;
      if (area) profileFields.area = area;
      if (state) profileFields.state = state;
      if (lat) profileFields.lat = lat;
      if (lng) profileFields.lng = lng;

      if (organization) profileFields.organization = organization;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;

      if (skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
      }

      //Build Social Object
      profileFields.social = {};

      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      // Build Emergency Object
      profileFields.emergencyinfo = {};
      if (contactperson)
        profileFields.emergencyinfo.contactperson = contactperson;
      if (relationship) profileFields.emergencyinfo.relationship = relationship;
      if (contactnumber)
        profileFields.emergencyinfo.contactnumber = contactnumber;
      if (eaddress) profileFields.emergencyinfo.eaddress = eaddress;
      if (bloodtype) profileFields.emergencyinfo.bloodtype = bloodtype;
      if (insured) profileFields.emergencyinfo.insured = insured;

      try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
          //Update

          profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          );
          return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }

    // res.send('AuthRoute')
  }
);

//@route GET api/profile/me
//@desc  Get Current user Profile
//@access Private

router.get("/me", auth, async (req, res) => {
  try {
    //user varialble pertains at the profile schema user: type: mongoose.Schema.Types.ObjectId,
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "lname"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Get api/profile
//@desc  Get all profiles
//@access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "lname"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route Get api/profile/user/:user_id
//@desc  Get profiles by user id
//@access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "lname"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found ObjectId" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/profile
//@desc  Delete profiles and all it post
//@access Private

router.delete("/", auth, async (req, res) => {
  try {
    //remove users post
    await Post.deleteMany({ user: req.user.id });

    //remove  Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/profile/experience
//@desc  Add profile experience
//@access Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Organization is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route DELETE api/profile/experience
//@desc  Delete profiles and all it post
//@access Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index from :exp_id
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/profile/education
//@desc  Add profile education
//@access Private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route DELETE api/profile/education/:edu_id
//@desc  Delete profiles and all it post
//@access Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index from :exp_id
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route put api/profile/emergencyinfo

//@access Private
router.put(
  "/emergencyinfo",
  [
    auth,
    [
      check("contactperson", "Contact person is required").not().isEmpty(),
      check("relationship", "Relationship is required").not().isEmpty(),
      check(
        "contactnumber",
        "Please a valid Philippines mobile number"
      ).isMobilePhone("en-PH"),

      check("eaddress", "Address is required").not().isEmpty(),
      check("bloodtype", "Blood type is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      contactperson,
      relationship,
      contactnumber,
      address,
      bloodtype,
      insured,
    } = req.body;

    const emergency = {
      contactperson,
      relationship,
      contactnumber,
      address,
      bloodtype,
      insured,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.emergencyinfo.unshift(emergency);
      // profile.emergencyinfo.unshift(emergency);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route DELETE api/profile/experience/_id
//@desc  Delete profiles and all it post
//@access Private

router.delete("/emergencyinfo/:emer_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.emergency.findOneAndRemove(req.params.emer_id);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
