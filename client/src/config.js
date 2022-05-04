import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://loyaltyhouse.herokuapp.com/api",
});

export default axiosInstance;
