require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")

async function startServer() {
  try {
    await connectDB()
    app.listen(3000, () => {
      console.log("Server is running on port 3000")
    })
  } catch (error) {
    console.error("Server startup failed:", error.message)
    process.exitCode = 1
  }
}

startServer()