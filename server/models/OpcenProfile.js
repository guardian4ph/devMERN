const mongoose = require("mongoose");

const OpcenProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  opcen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "operation_center",
  },
  established: {
    type: String,
  },
  logo: {
    type: String,
  },
  website: {
    type: String,
  },
  telcontact: {
    type: String,
    require: true,
  },
  mcontact: {
    type: String,
    require: true,
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
  status: {
    type: String,
    require: true,
  },
  motto: {
    type: String,
    require: true,
  },
  opcenhistory: {
    type: String,
  },
  certification: [
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

  trainings: [
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = OpcenProfile = mongoose.model(
  "opcen_profile",
  OpcenProfileSchema
);
