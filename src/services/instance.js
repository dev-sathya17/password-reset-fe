import axios from "axios";

const baseURL = "https://password-reset-j80k.onrender.com";

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
