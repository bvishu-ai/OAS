const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");

// GET all items
router.get("/", authMiddleware, itemController.getAllItems);

// POST create a new item
router.post("/", authMiddleware, itemController.createItem);

// GET a specific item by ID
router.get("/:id", authMiddleware, itemController.getItem);

// PUT update an item by ID
router.put("/:id", authMiddleware, itemController.updateItem);

// DELETE delete an item by ID
router.delete("/:id", authMiddleware, itemController.deleteItem);

module.exports = router;
