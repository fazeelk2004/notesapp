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


QF1dvpD840FNPm6h



mongodb+srv://fazeelk2004:QF1dvpD840FNPm6h@cluster0.pjmrowf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0d~