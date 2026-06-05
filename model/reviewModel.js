const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    //this creates a created at and updated at values by current time and date
    timestamps: true,
  },
);

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;
