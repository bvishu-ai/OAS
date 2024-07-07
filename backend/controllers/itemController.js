const Item = require("../models/Item");

// Get all items
exports.getAllItems = (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Create a new item
exports.createItem = (req, res) => {
  const { title, description, startingBid, auctionEndTime } = req.body;
  const newItem = new Item({
    title,
    description,
    startingBid,
    auctionEndTime,
    seller: req.user.id, // Assuming req.user.id is populated by authMiddleware
  });

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Get a specific item by ID
exports.getItem = (req, res) => {
  const itemId = req.params.id;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Update an item by ID
exports.updateItem = (req, res) => {
  const itemId = req.params.id;
  const { title, description, startingBid, auctionEndTime } = req.body;

  Item.findByIdAndUpdate(
    itemId,
    { title, description, startingBid, auctionEndTime },
    { new: true, runValidators: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

// Delete an item by ID
exports.deleteItem = (req, res) => {
  const itemId = req.params.id;

  Item.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item deleted successfully" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
