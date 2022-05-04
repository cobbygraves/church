const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Required",
  },
  password: {
    type: String,
    required: "Required",
  },
  status: {
    type: String,
    default: "member",
  },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
