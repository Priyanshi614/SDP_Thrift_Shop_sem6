const asyncHandler = require("express-async-handler")

const Item = require("../models/itemModel")

const addItem = asyncHandler( async (req, res) => {
    const {user, title, description, state, city, neighbourhood, selectedFile} = req.body

    // backend validation
    if(!user || !title || !description || !state || !city || !neighbourhood || !selectedFile) {
        console.log("user: ",user) 
       return res.status(400).json({message: "please include all fields"})
    }

    const item = await Item.create( {
        user,
        title,
        description, 
        state, 
        city, 
        neighbourhood,
        selectedFile
    })

    if(item) {
        res.status(201).json({message : "Item is successfully Added"})
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

} )

const getItems = asyncHandler( async (req, res) => {
    // console.log("In get Items controller")
    const items = await Item.find()
    // console.log(items)
    if(items) {
        // return items;
        res.status(200).json({
            items: items
        })
    } else {
        res.status(400)
        throw new Error("No Item Found")
    }

})


const getItemsByUser = asyncHandler(async (req, res) => {
    const itemUser = req.user
    const items = await Item.find({"user": itemUser.email})
    // console.log("--- === items ",items)

    if(items) {
        res.status(200).json({
            items: items
        })
    } else {
        res.status(400)
        throw new Error("No Item By You")
    }
})

const deleteItem = asyncHandler(async (req, res) => {
   
    console.log(req.params.itemId) 
    const deletedItem = await Item.deleteOne({"_id": req.params.itemId})

    res.status(204).json({message: "deleted successfully"})
})

module.exports = {
    addItem,
    getItems,
    getItemsByUser,
    deleteItem
}