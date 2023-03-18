const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // expire in  1 minute
    expires: 86400,
  },
});

module.exports = mongoose.model("user", userSchema);
