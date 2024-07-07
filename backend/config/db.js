const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://bvishu:auction123@auction.1w5e7xu.mongodb.net/";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

module.exports = db;
