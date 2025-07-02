import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
})); // Enable CORS for all routes

app.use(express.json()); // Middleware To Parse JSON Bodies

app.use(rateLimiter); // Rate Limiter Middleware

app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server Is Running on Port:', PORT);
  });
})

