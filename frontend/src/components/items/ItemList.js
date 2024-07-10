import React, { useEffect, useState } from "react";
import "../../styles/ItemList.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function ItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items...");
        const res = await axios.get("http://localhost:4000/items/itemget");
        console.log("Response received:", res);
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

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <img src={item.image} alt={item.title} className="item-image" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Base Bid: ${item.startingBid}</p>
            <p>Current Bid: ${item.currentBid}</p>
            <Link to={`/bidding/${item._id}`} className="place-bid-button">
              Place Bid
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsList;
