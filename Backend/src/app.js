const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("node:path")
const fs = require("node:fs")
const mongoose = require("mongoose")
const app = express()
app.use(express.json({ limit: "64kb" }))
app.use(cookieParser())
app.get("/api/health", (req, res) => {
  const ready = mongoose.connection.readyState === 1
  res.status(ready ? 200 : 503).json({ status: ready ? "ok" : "not ready" })
})
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api", (req, res) => res.status(404).json({ message: "Not found" }))
const dist = path.resolve(__dirname, "../../Frontend/dist")
if (fs.existsSync(path.join(dist, "index.html"))) {
  app.use(express.static(dist))
  app.get(["/", "/login", "/register"], (req, res) => res.sendFile(path.join(dist, "index.html")))
}
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  const status = err.status >= 400 && err.status < 500 ? err.status : 500
  res.status(status).json({ message: status === 500 ? "Internal server error" : "Invalid request" })
})
module.exports = app
