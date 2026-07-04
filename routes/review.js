const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/AsyncWrap");
const reviewController = require("../controllers/review");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlewares");

// Create Review
router.post(
  "/listings/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

// Delete Review
router.delete(
  "/listings/:listingid/reviews/:reviewid",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;
