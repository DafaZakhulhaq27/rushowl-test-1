import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 1000,
});

export default fetcher;
