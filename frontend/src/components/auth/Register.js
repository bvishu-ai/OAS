import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { setAuthToken } from "../../utils/api";

const Register = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res && res.data) {
        localStorage.setItem("jwtToken", res.data.token);
        setAuthToken(res.data.token);
        history.push("/items");
      } else {
        console.error("Empty or invalid response from server");
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onChange}
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        name="email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={onChange}
        minLength="6"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onChange}
        minLength="6"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
