import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3001/api" : "/api";

const apiNotes = axios.create({
  baseURL: BASE_URL,
});

export default apiNotes;