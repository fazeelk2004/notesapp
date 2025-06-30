import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(express.json()); // Middleware To Parse JSON Bodies

app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server Is Running on Port:', PORT);
});
