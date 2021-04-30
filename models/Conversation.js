const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  date: Date,
  content: String
});

const conversationSchema = new mongoose.Schema({
  users: [String],
  messages: [messageSchema]
});

mongoose.model("Conversation", conversationSchema);
