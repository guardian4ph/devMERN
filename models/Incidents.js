const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Incident_Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  type: {
    type: String,
    required: true,
  },
  scompleteaddress: {
    type: String,
  },
  slat: {
    type: String,
  },
  slng: {
    type: String,
  },
  scity: {
    type: String,
  },
  sarea: {
    type: String,
  },
  sstate: {
    type: String,
  },

  // dispatcher credentials
  dispatcher: {
    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "responder",
    },
    name: {
      type: String,
    },
    lname: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  chat: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },

      incident: {
        type: Schema.Types.ObjectId,
        ref: "incident",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      lname: {
        type: String,
      },
      profilepic: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  recording: {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "incident",
    },

    name: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  team: [
    {
      incident: {
        type: Schema.Types.ObjectId,
        ref: "incident",
      },

      name: {
        type: String,
      },

      profilepic: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  facility: {
    incident: {
      type: Schema.Types.ObjectId,
      ref: "incident",
    },
    name: {
      type: String,
    },
    receivedby: {
      type: String,
    },
    signature: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },

  alarm: [
    {
      incident: {
        type: Schema.Types.ObjectId,
        ref: "incident",
      },
      level: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  opcen: {
    opcen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "operation_center",
    },
  },
  calltaker: {
    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "responder",
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Incident = mongoose.model("incident", Incident_Schema);
