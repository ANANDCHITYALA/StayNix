const HotelModel = require("../model/airbnbmodel");
// const { cloudinary } = require("../config/cloudinary");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

// Home Page
module.exports.index = async (req, res) => {
  const allListings = await HotelModel.find({});
  res.render("listings/initialpage.ejs", { allListings });
};

// Show Single Listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const hotel = await HotelModel.findById(id)
    .populate("author")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  if (!hotel) {
    req.flash("error", "Listing not found.");
    return res.redirect("/");
  }

  //
  let averageRating = 0;

  if (hotel.reviews.length > 0) {
    const total = hotel.reviews.reduce((sum, review) => sum + review.rating, 0);

    averageRating = total / hotel.reviews.length;
  }

  averageRating = Number(averageRating.toFixed(1));

  res.render("listings/singlehotelview.ejs", { hotel, averageRating });
};

// Render New Form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Create Listing
module.exports.createListing = async (req, res) => {
  const listing = new HotelModel(req.body.listings);

  listing.author = req.user._id;

  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "StayNix",
      });

      listing.image = {
        url: result.secure_url,
        filename: result.public_id,
      };
    }

    await listing.save();

    req.flash("success", "Listing Created Successfully");
    res.redirect("/");
  } finally {
    if (req.file) {
      await fs.remove(req.file.path);
    }
  }
};

// Render Edit Form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const hotel = await HotelModel.findById(id);

  if (!hotel) {
    req.flash("error", "Listing not found.");
    return res.redirect("/");
  }

  res.render("listings/edit.ejs", { hotel });
};

// Update Listing

// Update Listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await HotelModel.findByIdAndUpdate(id, req.body.listings, {
    new: true,
    runValidators: true,
  });

  if (req.file) {
    if (listing.image && listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "StayNix",
    });

    listing.image = {
      url: result.secure_url,
      filename: result.public_id,
    };

    await listing.save();

    await fs.remove(req.file.path);
  }

  req.flash("success", "Listing Updated Successfully");

  res.redirect(`/view/${id}`);
};

// Delete Listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  const listing = await HotelModel.findById(id);

  if (listing.image && listing.image.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await HotelModel.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted Successfully.");

  res.redirect("/");
};

// Search Listing
module.exports.searchListing = async (req, res) => {
  let { searchText } = req.query;

  const post = await HotelModel.findOne({
    title: {
      $regex: searchText,
      $options: "i",
    },
  });

  if (!post) {
    req.flash("error", "Listing not found.");
    return res.redirect("/");
  }

  res.redirect(`/view/${post._id}`);
};
