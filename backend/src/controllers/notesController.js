import Note from '../models/Note.js';


//DISPLAYING ALL NOTES
export async function getAllNotes(_, res) {
  try{
    const notes = await Note.find().sort({createdAt: -1}); // Sort By Creation Date, Newest First
    res.status(200).json(notes);
  }catch (error) {
    console.error("Error in Get All Notes:", error.message);
    res.status(500).json({message: "Internal Server Error While Displaying Notes"});
  }
}


//DISPLAYING A SINGLE NOTE
export async function getNote(req, res) {
  try{
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message: "Note Not Found!"});
    res.status(200).json(note);
  }catch (error) {
    console.error("Error in Get Note:", error.message);
    res.status(500).json({message: "Internal Server Error While Displaying A Note"});
  }
}


//CREATING A NEW NOTE
export async function createNote(req, res) {
  try{
    const {userTitle, userContent} = req.body;
    const note = new Note({
      title: userTitle,
      content: userContent
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);

  }catch (error) {
    console.error("Error in Create Note:", error.message);
    res.status(500).json({message: "Internal Server Error While Creating A Note"});
  }
}


//UPDATING A NOTE
export async function updateNote(req,res) {
  try{
    const {userTitle, userContent} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title: userTitle, content: userContent}, {new: true});
    if(!updatedNote) return res.status(404).json({message: "Note Not Found!"});
    res.status(200).json(updatedNote);
  }catch (error) {
    console.error("Error in Update Note:", error.message);
    res.status(500).json({message: "Internal Server Error While Updating A Note"});
  }
}


//DELETING A NOTE
export async function deleteNote (req,res) {
  try{
    const deletedNode = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNode) return res.status(404).json({message: "Note Not Found!"});
    res.status(200).json({message: "Note Deleted Successfully!"});
  }catch (error) {
    console.error("Error in Delete Note:", error.message);
    res.status(500).json({message: "Internal Server Error While Deleting A Note"});
  }
}