//getting error that if user is alredy present and another user tries to register with same name it showing error msg as
//  error occured you have to place msg as already usernae exist try with another username

const express = require("express");
const app = express();
const port = 3000;

const User = require("./model/usermodel");

const passport = require("passport");
const LocalStrategy = require("passport-local");

//db connection establishing
const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log("connected to db");
  } catch (err) {
    console.log(`error .............${err}`);
  }
}

main();

//method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//requring async wrap for middleware to overcome errors
const wrapAsync = require("./utils/AsyncWrap");
// also
const ExpressError = require("./utils/ExpressError");

// requiring joi schema

const {
  reviewSchema,
  listingSchema,
} = require("./joiSchema"); /* requiring joi schema of review model */

// requiring model
const HotelModel = require("./model/airbnbmodel");
const reviewModel = require("./model/reviewModel");

//ejs setting
const path = require("path");
//ejs mate
const ejsMate = require("ejs-mate");

//Without this, JSON requests from Hoppscotch/Postman won't work.
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
//for ejs mate
app.engine("ejs", ejsMate);

//joi
const validateSchema = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  }
  next();
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  }
  next();
};

//to check whether the user is registered or not to manipulate the data

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you are not logged in ");
    return res.redirect("/login");
  }
  next();
};

// express-session
const flash = require("connect-flash");
const session = require("express-session");
const sessionOptions = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 6 * 12 * 60 * 60 * 1000,
    maxAge: 6 * 12 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// console.log(User);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware you should write here only because req.user is related to passport and anfter passport initialization
//  it activates beforew initialization it is undefined (no store of any date)

//only res.locals middleware applicable

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.request = req; // this for a boiler plate to display signup and login and logout
  res.locals.failure = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

app.get("/signup", (req, res) => {
  res.render("authentication/signup.ejs");
});

app.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    const { username, Email, password } = req.body;
    // console.log(username);
    const newUser = new User({ username, Email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      req.flash("success", "user succesfully registred");
      res.redirect("/");
    });
  }),
);
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/");
  },
);

app.get("/login", (req, res) => {
  res.render("authentication/login.ejs");
});
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "logeed out");
    res.redirect("/");
  });
});

//initial route
app.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await HotelModel.find();
    res.render("listings/initialpage.ejs", { allListings });
  }),
);

//viewing page
app.get(
  "/view/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const hotel = await HotelModel.findById(id).populate("reviews");
    if (!hotel) {
      throw new ExpressError(404, "hotel not found");
    }
    res.render("listings/singlehotelview", { hotel });
  }),
);

app.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

app.post(
  "/listings/new",
  isLoggedIn,
  validateSchema,

  wrapAsync(async (req, res) => {
    const listings = req.body.listings;
    console.log(listings);

    if (listings.image.url === "") {
      delete listings.image.url;
    }

    if (listings.image.filename === "") {
      delete listings.image.filename;
    }

    await HotelModel.insertOne(listings);
    req.flash("success", "Hotel added");

    res.redirect("/");
  }),
);

app.get(
  "/view/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hotel = await HotelModel.findById(id);
    res.render("listings/edit.ejs", { hotel });
  }),
);

app.put(
  "/listings/:id",
  validateSchema,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listings = req.body.listings;
    console.log(listings);

    if (listings.image.url === "") {
      delete listings.image.url;
    }

    if (listings.image.filename === "") {
      delete listings.image.filename;
    }

    await HotelModel.findByIdAndUpdate(id, listings);
    req.flash("success", "updated successfully");
    res.redirect(`/view/${id}`);
  }),
);

app.delete(
  "/view/:id/delete",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hotel = await HotelModel.findByIdAndDelete(id);
    req.flash("success", "Deleted successfully");
    console.log(`${hotel.title} was deleted`);
    res.redirect("/");
  }),
);

//reviews

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await HotelModel.findById(id);
    const newreview = new reviewModel(req.body.review);
    await newreview.save();

    await listing.reviews.push(newreview);
    req.flash("success", "review added");
    await listing.save();
    console.log(newreview);
    res.redirect(`/view/${id}`);
  }),
);

//deleting review

app.delete(
  "/listings/:listingid/reviews/:reviewid",
  wrapAsync(async (req, res) => {
    const { listingid, reviewid } = req.params;
    await HotelModel.findByIdAndUpdate(listingid, {
      $pull: { reviews: reviewid },
    });
    await reviewModel.findByIdAndDelete(reviewid);

    res.redirect(`/view/${listingid}`);
  }),
);

app.get(
  "/search",
  wrapAsync(async (req, res) => {
    var { searchText } = req.query;
    // console.log(searchText);

    // const post = await HotelModel.findOne({ title: searchText });  /* this search exact text. it is case sensitive eg: a!=A*/
    const post = await HotelModel.findOne({
      title: { $regex: searchText, $options: "i" },
    }); /* now anand = Anand */
    console.log(post);

    if (post === null) {
      res.send("post not found");
      searchText = "";
    } else {
      // searchText = "";

      res.redirect(`/view/${post._id}`);
    }
  }),
);

// middlewares

app.use((req, res, next) => {
  next(new ExpressError(400, "Route not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, errmsg = "error occured spam" } = err;
  // res.send(errmsg);
  res.status(status).render("listings/error.ejs", { error: errmsg });
});

//server started
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
