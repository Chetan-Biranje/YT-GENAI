require("dotenv").config()
const app = require("./src/app")
const coonnectToDB = require("./src/config/database")

coonnectToDB()

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})