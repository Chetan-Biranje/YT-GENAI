const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true," token is erquired to be added to black list"],

    }
},  {
    timestamps: true    

})

const blacklistTokenModel = mongoose.model("BlacklistToken", blacklistTokenSchema)

module.exports = blacklistTokenModel