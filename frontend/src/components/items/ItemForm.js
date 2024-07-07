import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const ItemForm = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
  });

  const { itemName, description, price } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/items", { itemName, description, price });
      history.push("/items");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        name="itemName"
        value={itemName}
        onChange={onChange}
        required
      />
      <textarea
        placeholder="Description"
        name="description"
        value={description}
        onChange={onChange}
        required
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={price}
        onChange={onChange}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
