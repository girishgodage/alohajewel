const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
    required: true,
  },
  lastName: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
    index: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false },
  cart: {
    type: Array,
    default: [],
  },
});
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
