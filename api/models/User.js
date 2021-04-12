const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const imageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema ({
  username: String,
  password: String,
  avatar: imageSchema,
  name: String,
  description: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
}

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
  };
};

mongoose.model("User", userSchema);
