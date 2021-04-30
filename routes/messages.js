const express = require("express");
const mongoose = require("mongoose");
const auth = require("../config/auth");

const Conversation = mongoose.model("Conversation");

const router = express.Router();

// conversations

router.route("/create-conversation")
  .post(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    const friend_id = req.body.id;

    Conversation.findOne(
      {
        users:
        { $all: [id, friend_id] }
      },
      (err, conversation) => {
        if(err) {
          console.log(err);
        } else {
          if(conversation) {
            res.sendStatus(200);
          } else {
            const conv = new Conversation({
              users: [id, req.body.id]
            });
            conv.save();
            res.sendStatus(200);
          }
        }
      });
  });

router.route("/get-conversations")
  .get(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    Conversation.find(
      {
        users: id
      },
      (err, conversations) => {
        if(err) {
          console.log(err);
        } else {
          if(conversations) {

            let convArray = [];

            conversations.forEach((conversation) => {
              if(conversation.messages && conversation.messages.length > 0) {
                let friend_id = conversation.users.filter(user => user != id)[0];
                let last_message_date = conversation.messages[conversation.messages.length - 1].date;
                convArray.push({
                    id: friend_id,
                    last_date: last_message_date
                  });
                }
            });

            res.send(convArray);

          } else {
            res.sendStatus(400);
          }
        }
      });

  });

// messages

router.route("/send-message")
  .post(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    const friend_id = req.body.id;

    Conversation.updateOne(
      {
        users:
        { $all: [id, friend_id] }
      },
      {
        $push:
        {
          messages:
          {
            sender: id,
            date: Date.now(),
            content: req.body.content
          }
        }
      },
      (err) => {
        if(!err) {
          req.app.get('io').emit('newMessageSended', [id, friend_id]);
          res.sendStatus(200);
        } else {
          console.log(err);
          res.sendStatus(400);
        }
      });
  });

router.route("/get-messages")
  .get(auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    const friend_id = req.query.id;

    const query = Conversation.findOne({ users: { $all: [id, friend_id] } }).select("-_id messages");

    query.exec(function (err, messages) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        res.send(messages);
      }
    });

  });

  module.exports = router;
