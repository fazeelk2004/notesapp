import express from 'express';

const app = express();

app.get("/api/notes", (req,res) => {
  res.send("YOU GOT 5 NOTES!");
})

app.listen(3000, () => {
  console.log('Server Is Running on Port: 3000');
});
