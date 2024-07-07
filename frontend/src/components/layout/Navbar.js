import React from "react";
import { Link } from "react-router-dom";
import { logout, isAuthenticated } from "../../utils/auth";

const Navbar = () => {
  return (
    <nav>
      <h1>Auction System</h1>
      <ul>
        {isAuthenticated() ? (
          <>
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/items/new">Add Item</Link>
            </li>
            <li>
              <a onClick={logout} href="#!">
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
