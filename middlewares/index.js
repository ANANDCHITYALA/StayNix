const { listingSchema, reviewSchema } = require("../joiSchema");
const ExpressError = require("../utils/ExpressError");
const HotelModel = require("../model/airbnbmodel");
const Review = require("../model/reviewModel");

// Joi Validation for Listings
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  }

  next();
};

// Joi Validation for Reviews
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  }

  next();
};

// Check Login
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please login first.");
    return res.redirect("/login");
  }

  next();
};

// Listing Owner Authorization
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await HotelModel.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/");
  }

  // Listing created before author field existed
  if (!listing.author) {
    req.flash(
      "error",
      "This listing doesn't have an owner. Please recreate it.",
    );
    return res.redirect(`/view/${id}`);
  }

  if (!listing.author.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing.");
    return res.redirect(`/view/${id}`);
  }

  next();
};

// Review Owner Authorization
module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewid, listingid } = req.params;

  const review = await Review.findById(reviewid);

  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/view/${listingid}`);
  }

  if (!review.author) {
    req.flash("error", "This review doesn't have an author.");
    return res.redirect(`/view/${listingid}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this review.");
    return res.redirect(`/view/${listingid}`);
  }

  next();
};
