const Item = require("../models/Item");

// Get all items
exports.getAllItems = (req, res) => {
  Item.find()
    .then((items) => {
      console.log("Items fetched:", items); // Log fetched items
      res.json(items);
    })
    .catch((err) => {
      console.error("Error fetching items:", err); // Log errors
      res.status(500).json({ error: err.message });
    });
};

// Create a new item
exports.createItem = async (req, res) => {
  const { title, description, startingBid, auctionEndTime } = req.body;
  const newItem = new Item({
    title,
    description,
    startingBid,
    auctionEndTime,
    seller: req.user.id, // Assuming req.user.id is populated by authentication middleware
  });

  try {
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.biddingUpdate = async (req, res) => {
  const { id } = req.params;
  const { bidder, amount } = req.body;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Validate the new bid amount
    if (parseFloat(amount) <= parseFloat(item.currentBid)) {
      return res
        .status(400)
        .json({ message: "Bid amount must be higher than the current bid" });
    }

    // Update the item with the new bid and bidder
    item.currentBid = amount;
    item.currentBidder = bidder;

    await item.save();

    res.status(200).json({ message: "Bid updated successfully", item });
  } catch (err) {
    console.error("Error updating bid:", err);
    res.status(500).json({ error: err.message });
  }
};

// Existing getItemById function for reference
exports.getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ error: err.message });
  }
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
