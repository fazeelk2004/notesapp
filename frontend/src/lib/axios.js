import axios from "axios";

const apiNotes = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default apiNotes;