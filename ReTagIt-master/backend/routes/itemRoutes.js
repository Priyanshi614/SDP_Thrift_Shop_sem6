const express = require("express");
const router = express.Router();

const { addItem, getItems, getItemsByUser, deleteItem } = require("../controllers/itemController");
const {protect} = require("../middleware/authMiddleware")


router.post("/", protect, addItem)
router.get("/", getItems)
router.get("/user", protect, getItemsByUser)
router.delete("/:itemId", protect, deleteItem)

module.exports = router