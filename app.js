const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// require("dotenv").config();
const dotenv = require("dotenv");

dotenv.config({
  path: "../.env",
});

console.log(process.env.Mongo_URL);
console.log(process.env.Mongo_URL);

// Database
const connectDB = require("./config/db");

// const multer = require("multer");
// const { storage } = require("./config/cloudinary");

// const upload = multer({
//   storage,
// });

// Passport
const passport = require("passport");
const configurePassport = require("./config/passport");

// Session
const session = require("express-session");
const flash = require("connect-flash");

// Routes
const listingRoutes = require("./routes/listing");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

// Error
const ExpressError = require("./utils/ExpressError");

const PORT = process.env.PORT || 3000;

// =======================
// Database Connection
// =======================
connectDB();

// =======================
// View Engine
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

// =======================
// Middlewares
// =======================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

// =======================
// Session
// =======================
const sessionOptions = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,

  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

app.use(flash());

// =======================
// Passport
// =======================
app.use(passport.initialize());

app.use(passport.session());

configurePassport();

// =======================
// Flash Middleware
// =======================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");

  res.locals.failure = req.flash("error");

  res.locals.currUser = req.user;

  // Needed in boilerplate.ejs
  res.locals.request = req;

  next();
});

// =======================
// Routes
// =======================
app.use("/", userRoutes);

app.use("/", listingRoutes);

app.use("/", reviewRoutes);

// =======================
// 404
// =======================
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

// =======================
// Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error("===========================");

  let { status = 500, errmsg = err.message || "Something went wrong" } = err;

  res.status(status).render("listings/error.ejs", {
    error: errmsg,
  });
});

// =======================
// Server
// =======================
app.listen(PORT, () => {
  console.log(`Server Started : http://localhost:${PORT}`);
});
