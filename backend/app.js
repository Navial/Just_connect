const express = require("express");
const session = require("express-session");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");

var path = require("path");
const cors = require('cors');
const passport = require('passport');

const { MONGODB_URI } = require("./utils/config");

var indexRouter = require("./routes/index");
const oauthGoogleRouter = require("./routes/oauthGoogle");
require("dotenv").config();

const discordRouter = require("./routes/discord");
const authRouter = require("./routes/auth");
const twitchRouter = require("./routes/twitch");

const app = express();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);

// Initialisation de passport
app.use(passport.initialize());
app.use(passport.session());

// Méthodes pour sérialiser et désérialiser l'utilisateur dans la session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use("/", indexRouter);
app.use("/discord", discordRouter);
app.use("/auth", authRouter);
app.use("/twitch", twitchRouter);

app.use("/oauthGoogle", oauthGoogleRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send("Error");

  app.use(function (req, res, next) {
    next(createError(404));
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
