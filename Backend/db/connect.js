const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`\nMONGODB connected, DB HOST: ${connectionString.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
