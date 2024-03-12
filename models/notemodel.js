const mongoose=require('mongoose');

const noteSchema=mongoose.Schema({
    title:String,
    description:String,
    userID:String,
    user:String
},{
    versionKey:false
})

const NoteModel=mongoose.model('note',noteSchema);

module.exports={NoteModel}