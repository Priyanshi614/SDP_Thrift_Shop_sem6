const mongoose = require("mongoose")
// const { stringify } = require("querystring")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"]
    },
    email: {
        type: String,
        require: [true, "Please add an email"],
        unique: true       
    },
    mobile : {
        type: Number,
        require: [true, "Please add a mobile number"]

    },
    password: {
        type: String,
        require: [true, "Please add a password"]
    },
})

module.exports = mongoose.model('User', userSchema)
