export function getAllNotes(req, res) {
  res.status(200).send("YOU GOT 30 NOTES!");
}

export function createNote(req, res) {
  res.status(201).json({message: "Note Created!"});
}

export function updateNote(req,res) {
  res.status(200).json({message: "Note Updated!"});
}

export function deleteNote (req,res) {
  res.status(200).json({message: "Note Deleted!"});
}