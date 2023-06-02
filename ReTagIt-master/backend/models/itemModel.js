const mongoose = require("mongoose")
// const { stringify } = require("querystring")

const itemSchema = mongoose.Schema({
    user: {
        type: String // email
    },
    title: {
        type: String,
        require: [true, "Please add a title"]
    },
    category: {
        type: String,
        require: [true, "Please select category"],
               
    },
    description: {
        type: String,
        require: [true, "Please add a description"]
    },
    price : {
        type: Number,
        require : [true, "please add price"]
    },
    state : {
        type: String,
        require: [true, "Please enter state name"]
    },
    city : {
        type: String,
        require: [true, "Please enter city name"]
    },
    neighbourhood : {
        type: String,
        require: [true, "Please enter neighbourhood name"]
    },
    selectedFile : {
        type: String,
        require: [true, "Please upload the item image"]
    }
})

module.exports = mongoose.model('Item', itemSchema)