const Item = require("../models/Item");

exports.getAllItems = (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
};

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
    .catch((err) => console.log(err));
};
