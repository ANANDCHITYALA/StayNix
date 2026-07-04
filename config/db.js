const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("Database Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
