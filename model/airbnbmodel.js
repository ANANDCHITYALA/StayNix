const mongoose = require("mongoose");
const reviewModel = require("./reviewModel");
const { ref } = require("joi");

const hotelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "noimagename.jpg",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviewModel",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
  },
});

const HotelModel = mongoose.model("HotelModel", hotelSchema);
module.exports = HotelModel;
