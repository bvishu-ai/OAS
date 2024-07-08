import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    // Perform any additional logout logic here if needed
  };

  return (
    <nav>
      <h1>Auction System</h1>
      <ul>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/items/new">Add Item</Link>
            </li>
            <li>
              <a onClick={handleLogout} href="#!">
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
