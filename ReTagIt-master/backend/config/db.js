const mongoose = require("mongoose")


const connectDB = () => {
    try{
        // const conn = mongoose.createConnection(process.env.MONGO_URI)
        // TODO: change
        return mongoose.connect(process.env.MONGO_URI);
        // const conn = mongoose.createConnection(process.env.MONGO_URI, () => {
        //     console.log("------------ mongoDB connected --------------")
        // });
        

    }
    catch(error) {
        console.log(`Error : ${error}`);
        process.exit(1)
    }
}

module.exports = connectDB