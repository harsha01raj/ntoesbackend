const express=require('express');
const {NoteModel}=require('../models/notemodel.js');

const noteRouter=express.Router();

noteRouter.post('/create',async(req,res)=>{
    try {
        console.log(req.body);
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({"Message":"A new note has been created","note":note});
    } catch (error) {
        res.send({"Error":error});
    }
})

noteRouter.get('/',async(req,res)=>{
    try {
        const notes = await NoteModel.find({user:req.body.user});
        res.send(notes);
    } catch (error) {
        res.status(400).send(error);
    }
})

noteRouter.patch('/update/:noteId',async(req,res)=>{
    const {noteId}=req.params;
    try {
        await NoteModel.findByIdAndUpdate({_id:noteId},req.body);
        res.status(200).send("Note has been updated");
    } catch (error) {
        res.send({'Message':error});
    }
})

noteRouter.delete("/delete/:noteId",async(req,res)=>{
    const {noteId}=req.params;
    try {
        await NoteModel.findByIdAndDelete({_id:noteId});
        res.status(200).send("Your note has deleted");
    } catch (error) {
        res.send({"Message":error})
    }
})

module.exports={noteRouter};