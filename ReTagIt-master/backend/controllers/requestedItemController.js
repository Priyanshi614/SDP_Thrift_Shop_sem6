const asyncHandler = require("express-async-handler")

const RequestedItem = require("../models/requestedItemModel")
const requestedItemModel = require("../models/requestedItemModel")
const User = require("../models/userModel")

const addRequestedItem = asyncHandler(async (req, res) => {
    
    const {item, user} = req.body

    if( user != null || item != null) {
        console.log("In r_item controller: ",item, user)
        const date = new Date()
        const permission = false
        
        // isRequestComplete false -> pending 
        const isRequestComplete = false
        const owner = await User.findOne({"email": item.user})
        console.log("owner -----", owner)

        const requestedItem = await RequestedItem.create({
            owner: owner,
            requestedUser: user,
            item,
            date,
            permission,
            isRequestComplete
        })

        if(requestedItem) {
            console.log("request successful")
            res.status(201).json("successfully requested")
        } else {
            res.status(400)
            throw new Error("There is some error, please try again")
        }

    } else {
        res.status(400).json({message: "Please include all the fields"})
    }
}) 

const getAllPendingRequestedItems = (asyncHandler( async (req, res) => {
    const user = req.user

    const r_items = await requestedItemModel.find({"owner.email": user.email, isRequestComplete: false})
    res.status(200).json(r_items)
}))

const getAllRequestedItems = (asyncHandler( async (req, res) => {
    const user = req.user
    // console.log("======== getAllRequestedItems ======")

    const r_items = await requestedItemModel.find({"requestedUser.email": user.email})

    // console.log(r_items)
    res.status(200).json(r_items)
}))

const getAllAcceptedRequestedItems = (asyncHandler( async (req, res) => {
    const user = req.user

    const r_items = await requestedItemModel.find({"owner.email": user.email, permission: true})
    res.status(200).json(r_items)
}))

const acceptRequest = (asyncHandler(async (req, res) => {
    const { r_item_id } = req.body
    
    // get the r_item with id r_item_id
    const r_item = await requestedItemModel.findOne({_id: r_item_id});
    
    r_item.isRequestComplete = true
    r_item.permission = true
    await requestedItemModel.updateOne({_id:r_item_id},r_item)
    res.status(201).json({message: "successfuly accepted"})

})) 

const deniedRequest = (asyncHandler(async (req, res) => {
    const { r_item_id } = req.body
    
    // get the r_item with id r_item_id
    const r_item = await requestedItemModel.findOne({_id: r_item_id});
    
    r_item.isRequestComplete = true
    r_item.permission = false
    await requestedItemModel.updateOne({_id:r_item_id},r_item)
    res.status(201).json({message: "successfuly accepted"})

})) 

module.exports = {
    addRequestedItem,
    getAllPendingRequestedItems,
    acceptRequest,
    getAllAcceptedRequestedItems,
    deniedRequest,
    getAllRequestedItems
}
