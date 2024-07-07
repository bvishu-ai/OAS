const Bid = require("../models/Bid");
const Item = require("../models/Item");

exports.placeBid = (req, res) => {
  const { amount } = req.body;
  const { itemId } = req.params;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      if (amount <= item.currentBid) {
        return res
          .status(400)
          .json({ message: "Bid must be higher than current bid" });
      }

      const newBid = new Bid({
        amount,
        bidder: req.user.id,
        item: itemId,
      });

      newBid
        .save()
        .then((bid) => {
          item.currentBid = amount;
          item
            .save()
            .then((updatedItem) => res.json(bid))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
