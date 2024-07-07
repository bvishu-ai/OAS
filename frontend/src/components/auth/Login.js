import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../../utils/api";

const Login = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("jwtToken", res.data.token);
      setAuthToken(res.data.token);
      history("/items"); // Use history function directly for navigation
    } catch (err) {
      console.error(err.response.data); // Log the error to console
      // Example: Set an error state to display an error message to the user
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
