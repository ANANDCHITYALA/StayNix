const express = require("express");
const router = express.Router();

// const multer = require("multer");
// const { storage } = require("../config/cloudinary");

// const upload = multer({
//   storage,
// });

const upload = require("../config/multer");

const wrapAsync = require("../utils/AsyncWrap");

const listingController = require("../controllers/listing");

const { validateListing, isLoggedIn, isOwner } = require("../middlewares");

// Home Page
router.get("/", wrapAsync(listingController.index));

// New Listing Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create Listing
router.post(
  "/listings/new",

  isLoggedIn,

  upload.single("image"),

  validateListing,

  wrapAsync(listingController.createListing),
);

// Search Listing
router.get("/search", wrapAsync(listingController.searchListing));

// Show Listing
router.get("/view/:id", wrapAsync(listingController.showListing));

// Edit Form
router.get(
  "/view/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

// Update Listing
router.put(
  "/listings/:id",

  isLoggedIn,

  isOwner,

  upload.single("image"),

  validateListing,

  wrapAsync(listingController.updateListing),
);

// Delete Listing
router.delete(
  "/view/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing),
);

module.exports = router;
