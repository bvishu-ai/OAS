const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bidController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:itemId", authMiddleware, bidController.placeBid);

module.exports = router;
