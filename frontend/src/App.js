import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ItemList from "./components/items/ItemList";
import ItemDetail from "./components/items/ItemDetail";
import ItemForm from "./components/items/ItemForm";
import Navbar from "./components/layout/Navbar";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/items/new" element={<ItemForm />} />
            <Route path="/items/:id" element={<ItemDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
