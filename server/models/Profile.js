const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",

    required: true,
    index: true,
  },
  profilepic: {
    type: String,
    required: true,
  },
  completeaddress: {
    type: String,
    require: true,
  },
  city: {
    type: String,
  },
  area: {
    type: String,
  },
  state: {
    type: String,
  },

  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },

  gender: {
    type: String,
    require: true,
  },
  civilstatus: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
  },

  organization: {
    type: String,
  },

  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String,
  },

  experience: [
    {
      title: {
        type: String,
        require: true,
      },
      company: {
        type: String,
        require: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        require: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String,
      },
    },
  ],

  education: [
    {
      school: {
        type: String,
        require: true,
      },
      degree: {
        type: String,
        require: true,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date,
        require: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String,
      },
    },
  ],

  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },

  emergencyinfo: {
    contactperson: {
      type: String,
    },
    relationship: {
      type: String,
    },
    contactnumber: {
      type: String,
    },
    eaddress: {
      type: String,
    },

    bloodtype: {
      type: String,
    },

    insured: {
      type: String,
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
