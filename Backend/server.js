require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")
const port = Number(process.env.PORT || 3000)

async function startServer() {
  try {
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT")
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || process.env.JWT_SECRET === "replace-with-a-long-random-secret") {
      throw new Error("Configure a random JWT_SECRET of at least 32 characters")
    }
    await connectDB()
    app.listen(port, "0.0.0.0", () => console.log("Server listening on port " + port))
  } catch (error) {
    console.error("Server startup failed:", error.message)
    process.exitCode = 1
  }
}
startServer()
