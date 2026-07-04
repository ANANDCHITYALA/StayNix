const HotelModel = require("../model/airbnbmodel");
const Review = require("../model/reviewModel");

// Create Review
module.exports.createReview = async (req, res) => {
  const { id } = req.params;

  const listing = await HotelModel.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/");
  }

  const newReview = new Review(req.body.review);

  // Save review owner
  newReview.author = req.user._id;

  await newReview.save();

  listing.reviews.push(newReview);

  await listing.save();

  req.flash("success", "Review Added Successfully.");

  res.redirect(`/view/${id}`);
};

// Delete Review
module.exports.deleteReview = async (req, res) => {
  const { listingid, reviewid } = req.params;

  await HotelModel.findByIdAndUpdate(listingid, {
    $pull: {
      reviews: reviewid,
    },
  });

  await Review.findByIdAndDelete(reviewid);

  req.flash("success", "Review Deleted Successfully.");

  res.redirect(`/view/${listingid}`);
};
