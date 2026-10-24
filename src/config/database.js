const mongoose = require("mongoose")

async function connectDB() {
  const mongoUri = process.env.MONGO_URI
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set in the environment")
  }

  await mongoose.connect(mongoUri)
  console.log("Connected to Database")
}


module.exports = connectDB