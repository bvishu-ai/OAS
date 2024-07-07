import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>{item.itemName}</h2>
      <p>Description: {item.description}</p>
      <p>Price: ${item.price}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ItemDetail;
