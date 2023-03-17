const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB;

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("WhatsApp Backend Databse is connected to MongoDB 👍");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
