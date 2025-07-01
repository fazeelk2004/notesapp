Start by initiazlizing package.json file by "npm init -y"
install express by "npm install express@4.18.2"
create server.js file
import express from 'express';
to use import change type in package.json to module

const app = express();

TO CHECK IF EXPRESS IS RUNNING
app.listen(3000, () => {
    console.log("Server Running on Port 3000")
})

ROUTES INITIAZING
app.get("api/notes", (req,res) => {
    res.status(200).send("You Got 5 Notes")
})

Install Nodemon so it can be restarted automatically in development
create a script using "dev": "nodemon server.js"

make a route folder
in notesRoutes create router = expres.router();

server.js import notesRoutes.js => app.use("api/notes", notesRoutes);

create notesController.js and make functions for each GET, POST, PUT, DELETE and call them in notesRoutes.js





DATABASE CONNECTION!

QF1dvpD840FNPm6h

mongodb+srv://fazeelk2004:QF1dvpD840FNPm6h@cluster0.pjmrowf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0d~

install mongoose

create a db.js file
import mongoose
create a function connectDB
try catch block
mongoose.connect("KEY!")

make .env file

install dotenv
make keys name MONGO_URI

call it by process.env.MONDO_URI

SERVER.JS
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

create a models foler and in it create Note.js
create a schema and then create a model

const noteSchema = new mongoose.Schema({},{timestamps:true})
const Note = mongoose.model("Note", noteSchema)
export default Note


use app.use(express.json()); as a middleware in server.js
Create the controllers for each CRUD operation
create a new route to display a specific note

