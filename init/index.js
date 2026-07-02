const mongoose = require("mongoose");
const path = require("path");
const HotelModel = require("../model/airbnbmodel");
const sampleListings = require("./data");

//db connection
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

async function dbconnection() {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log("mongodb connected succesful");

    const countofhotels = await HotelModel.insertMany(sampleListings);
    console.log(
      `hotels inserted successfully of count : ${countofhotels.length}`,
    );

    await mongoose.connection.close();
    console.log("connection closed successfully");
  } catch (err) {
    console.log(err);
  }
}

dbconnection();
