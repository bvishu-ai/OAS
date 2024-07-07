import axios from "axios";

const api = axios.create({
  baseURL: "mongodb+srv://bvishu:auction123@auction.1w5e7xu.mongodb.net/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
