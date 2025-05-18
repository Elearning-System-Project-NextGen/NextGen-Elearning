const mongoose = require("mongoose");

class Database {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }
}

module.exports = Database;
