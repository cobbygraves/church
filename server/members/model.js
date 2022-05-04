const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  id: {
    type: String,
    required: "Required",
  },

  first: {
    type: String,
    required: "Required",
  },

  last: {
    type: String,
    required: "Required",
  },

  other: {
    type: String,
  },

  email: {
    type: String,
  },
  birth: {
    type: String,
  },
  telephone: {
    type: String,
  },
  location: {
    type: String,
  },
  branch: {
    type: String,
    required: "Required",
  },
  bacenta: {
    type: String,
  },
  fellowship: {
    type: String,
  },
  ministry: {
    type: String,
  },
  shepherd: {
    type: String,
    required: "Required",
  },
  relation: {
    type: String,
  },
  relationContact: {
    type: String,
  },
  pic: {
    type: String,
  },
});

const MemberModel = mongoose.model("members", memberSchema);

module.exports = MemberModel;
