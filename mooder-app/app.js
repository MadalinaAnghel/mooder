require("dotenv").config();
express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

//models
require("./models/User");
require("./config/passport");

//routes
var usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}.`));
