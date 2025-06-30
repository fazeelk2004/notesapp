import mongoose from "mongoose";

//1- Create a Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
  }, 
  { timestamps: true }
);
//2- Create a Model

const Note = mongoose.model("Note", noteSchema);

export default Note;