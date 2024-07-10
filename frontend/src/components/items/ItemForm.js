import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ItemForm.css";

const ItemForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState(0);
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newItem = {
      title,
      description,
      startingBid,
      auctionEndTime,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/items/createItem",
        newItem
      );
      console.log("Item created successfully:", res.data);
      navigate("/items");
    } catch (err) {
      console.error("Error creating item:", err);
      alert(err);
    }
  };

  return (
    <div className="item-form-container">
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Starting Bid:</label>
        <input
          type="number"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          required
        />

        <label>Auction End Time:</label>
        <input
          type="datetime-local"
          value={auctionEndTime}
          onChange={(e) => setAuctionEndTime(e.target.value)}
          required
        />

        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
