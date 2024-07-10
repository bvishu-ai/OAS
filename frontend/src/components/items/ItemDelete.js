import React, { useEffect, useState } from "react";
import "../../styles/ItemList.css";
import axios from "axios";

function ItemsDelete() {
  const [items, setItems] = useState([]);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:4000/items/itemget");
      if (res.status === 200) {
        setItems(res.data);
      } else {
        throw new Error("Failed to fetch items");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch items");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/items/${selectedItemId}`,
        {
          headers: {
            Authorization: adminPasscode, // Send admin passcode as authorization header
          },
        }
      );
      if (res.status === 200) {
        alert("Item deleted successfully");
        fetchItems(); // Refresh items list after deletion
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  const handleChange = (event) => {
    setAdminPasscode(event.target.value);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <div>
      <h1>Item List</h1>
      <div className="admin-controls">
        <input
          type="password"
          placeholder="Admin Passcode"
          value={adminPasscode}
          onChange={handleChange}
        />
        <button onClick={handleDelete} className="delete-button">
          Delete Item
        </button>
        <select
          onChange={(e) => handleSelectItem(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select item to delete
          </option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <img src={item.image} alt={item.title} className="item-image" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Base Bid: ${item.startingBid}</p>
            <p>Current Bid: ${item.currentBid}</p>
            <button
              onClick={() => handleSelectItem(item._id)}
              className="delete-item-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsDelete;
