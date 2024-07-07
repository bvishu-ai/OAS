import api from "./api";

export const isAuthenticated = () => {
  const token = localStorage.getItem("jwtToken");
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  api.defaults.headers.common["Authorization"] = null;
  window.location.href = "/login";
};
