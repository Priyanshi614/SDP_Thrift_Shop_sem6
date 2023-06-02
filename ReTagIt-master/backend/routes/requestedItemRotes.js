const express = require("express");
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')

const { addRequestedItem, getAllPendingRequestedItems, acceptRequest, getAllAcceptedRequestedItems, deniedRequest, getAllRequestedItems } = require("../controllers/requestedItemController")

router.post("/", protect, addRequestedItem)
router.get("/pending", protect, getAllPendingRequestedItems)
router.post("/accept", protect, acceptRequest)
router.get("/accepted", protect, getAllAcceptedRequestedItems)
router.post("/denied", protect, deniedRequest)
router.get("/", protect, getAllRequestedItems)

module.exports = router