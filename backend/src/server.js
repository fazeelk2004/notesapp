import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

const __dirname = path.resolve(); // Get the current directory name

if(process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: "http://localhost:5173",
  })); // Enable CORS for all routes
}

app.use(express.json()); // Middleware To Parse JSON Bodies

app.use(rateLimiter); // Rate Limiter Middleware

app.use('/api/notes', notesRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,"../frontend/dist"))); // Serve static files from the frontend build directory

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend','dist','index.html')); // Serve the index.html file for all other routes
  })
}

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server Is Running on Port:', PORT);
  });
})

