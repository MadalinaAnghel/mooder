const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
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

//avatar
const imageUpload = require("../config//multer");

router.route("/avatar")
  .post(auth.required, imageUpload.single('imageData'), (req, res, next) => {
    const { payload: { id } } = req;

    const name = req.body.imageName;
    const path = req.file.path;

    User.updateOne(
      {_id: id},
      {$set: {avatar: {imageName: name, imageData: path}}},
      (err) => {
        if(!err) {
          res.sendStatus(200);
        } else {
          console.log(err);
          res.sendStatus(400);
        }
      });
  })

  .get(auth.required, (req, res, next) => {
    let { payload: { id } } = req;

    id = (Object.keys(req.query).length !== 0 && req.query.id !== null) ? req.query.id : id;

      User.findById(id, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          if(user.avatar) {
            res.send(user.avatar.imageData);
          } else {
            res.sendStatus(400);
          }
      }
    });
});

//username
router.route("/name")
  .post(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    User.updateOne(
      {_id: id},
      {$set: {name: req.body.name}},
      (err) => {
        if(!err) {
          res.sendStatus(200);
        } else {
          console.log(err);
          res.sendStatus(400);
        }
      });
  })

  .get(auth.required, (req, res, next) => {
    let { payload: { id } } = req;

    id = (Object.keys(req.query).length !== 0 && req.query.id !== null) ? req.query.id : id;

      User.findById(id, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          if(user.name) {
            res.send(user.name);
          } else {
            res.sendStatus(400);
          }
      }
    });
  });

//description
router.route("/description")
  .post(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    User.updateOne(
      {_id: id},
      {$set: {description: req.body.description}},
      (err) => {
        if(!err) {
          res.sendStatus(200);
        } else {
          console.log(err);
          res.sendStatus(400);
        }
      });
  })

  .get(auth.required, (req, res, next) => {
    let { payload: { id } } = req;

    id = (Object.keys(req.query).length !== 0 && req.query.id !== null) ? req.query.id : id;

      User.findById(id, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          if(user.description) {
            res.send(user.description);
          } else {
            res.sendStatus(400);
          }
      }
    });
  });

// posts
router.route("/post")
  .post(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    User.updateOne(
      {_id: id},
      {
        $push:
        {
          posts:
          {
            emojiId: req.body.emojiId,
            emojiSkin: req.body.emojiSkin,
            text: req.body.text,
            date: Date.now()
          }
        }
      },
      (err) => {
        if(!err) {
          res.sendStatus(200);
        } else {
          console.log(err);
          res.sendStatus(400);
        }
      });
  });

router.route("/posts")
  .get(auth.required, (req, res, next) => {
    let { payload: { id } } = req;

    id = (Object.keys(req.query).length !== 0 && req.query.id !== null) ? req.query.id : id;

      User.findById(id, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          if(user.posts) {
            res.send(user.posts);
          } else {
            res.sendStatus(400);
          }
      }
    });
  });

router.route("/delete-post")
  .post(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    User.updateOne(
      {_id: id},
      {
        $pull:
        {
          posts: {_id: req.body.id}
        }
      },
      (err) => {
        if(!err) {
          res.sendStatus(200);
        } else {
          console.log(err);
          res.sendStatus(400);
        }
      });
  });

//get all users
router.route("/users-list")
  .get(auth.required, (req, res, next) => {

      const query = User.find({}).select("_id name");

      query.exec(function (err, users) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          res.send(users);
        }
      });
  });

module.exports = router;
