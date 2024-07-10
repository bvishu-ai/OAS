import React, { useState, useEffect } from "react";
import axios from "axios";

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/items/getAllItem"
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Catalog</h1>
      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {/* Add more item details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
