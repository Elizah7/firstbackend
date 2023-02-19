const mongoose = require("mongoose")

const notesShcema = mongoose.Schema({
    title: { type: String, required: true },
    author:{type:String,required:true}
})

  
const NotesModel = mongoose.model("notes", notesShcema)

module.exports = {NotesModel}