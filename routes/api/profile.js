const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const { check, validationResult } = require("express-validator");
//@route GET api/profile/me
//@desc  Get Current user Profile
//@access Private

router.get("/me", auth, async (req, res) => {
  try {
    //user varialble pertains at the profile schema user: type: mongoose.Schema.Types.ObjectId,
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc  Create or update user Profile
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
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
        linkedin
    
    }  = req.body

    // Build Profile Object
    const profileFields = {};
    profileFields.user =req.user.id;
    if (company) profileFields.company =company;
    if (website) profileFields.company =website;
    if (bio) profileFields.company =bio;
    if (status) profileFields.company =status;
    if (githubusername) profileFields.company =githubusername;
    
    


   // res.send('AuthRoute')
  }
  
);

module.exports = router;
