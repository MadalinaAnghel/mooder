require("dotenv").config();
express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/mooderDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

//models
require("./models/User");
require("./config/passport");

//routes
var usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(9000, () => console.log("Server running on http://localhost:9000/"));
