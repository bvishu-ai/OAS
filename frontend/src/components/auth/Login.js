import React, { useState } from "react";
import "../../styles/Register.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let inputObj = { email, password };
    console.log(inputObj);
    let url = "http://localhost:4000/auth/login";

    try {
      const res = await axios.post(url, inputObj);
      if (res.status === 200) {
        alert("Login Successful");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/";
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
