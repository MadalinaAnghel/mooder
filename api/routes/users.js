const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const auth = require("../config/auth");

const User = mongoose.model("User");

const router = express.Router();

//register a new user by adding it to the database
router.post("/register", auth.optional, (req, res, next) => {

  User.register({username: req.body.username}, req.body.password, (err, user) => {
    if(err) {
      console.log(err);
    } else {
      res.send(user.toAuthJSON());
    }
  });
});

//login a user using passport
router.post("/login", auth.optional, (req, res, next) => {

  passport.authenticate("local", { session: false }, (err, passportUser, info) => {
    if(err) {
      console.log(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      res.send(user.toAuthJSON());
    } else {
      res.sendStatus(400);
    }

 })(req, res, next);
});


//get the current user
router.get("/current", auth.required, (req, res, next) => {
  const { payload: { id } } = req;

    User.findById(id, (err, user) => {
      if(err) {
        console.log(err);
      } else {
        if(user) {
          res.send(user.toAuthJSON());
        } else {
          res.sendStatus(400);
        }
    }
  });
});

module.exports = router;
