const express = require("express")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000
const cors = require("cors")
const {errorHandler} = require("./middleware/errorHandler")
// const morgan = require('morgan');
const connectDB = require("./config/db")
const mongoose = require('mongoose')
const {initialize_gfs, imageRouter} = require("./routes/imageRoutes")

// TODO: new version (upload image)
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
let gfs;

connectDB().then(() => {
    const conn = mongoose.connection;
    // console.log("------- connection ----------",conn)
    gfs = initialize_gfs(conn)

})

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use("/api/users", require("./routes/userRoutes"))

app.use("/api/item", require("./routes/itemRoutes"))

app.use("/api/requestedItem", require("./routes/requestedItemRotes"))

app.use("/api/image", (req, res, next)=>{
    // console.log("IN server", gfs)
    req.gfs = gfs;
    next();
})

app.use("/api/image", imageRouter)

// TODO: NEW

app.use(errorHandler)

app.listen(PORT, () => "server started...")