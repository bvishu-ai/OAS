const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// GET all items
router.get("/", itemController.getAllItems);

// POST create a new item
router.post("/", itemController.createItem);

// GET a specific item by ID
router.get("/:id", itemController.getItem);

// PUT update an item by ID
router.put("/:id", itemController.updateItem);

// DELETE delete an item by ID
router.delete("/:id", itemController.deleteItem);

module.exports = router;
