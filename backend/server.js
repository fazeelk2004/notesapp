import express from 'express';

const app = express();

app.get("/api/notes", (req,res) => {
  res.status(200).send("YOU GOT 20 NOTES!");
})

app.post("/api/notes", (req,res) => {
  res.status(201).json({message: "Note Created!"});
})

app.put("/api/notes/:id", (req,res) => {
  res.status(200).json({message: "Note Updated!"});
})

app.delete("/api/notes/:id", (req,res) => {
  res.status(200).json({message: "Note Deleted!"});
})

app.listen(3000, () => {
  console.log('Server Is Running on Port: 3000');
});
