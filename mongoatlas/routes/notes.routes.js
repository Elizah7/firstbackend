
const express = require("express")
const { NotesModel } = require("../models/notesmodel")
const app = express();
const notesRoutes = express.Router()

app.use(express.json())
notesRoutes.get("/", async (req, res) => {
    const query = req.query
    try {
        const alldata = await NotesModel.find(query)
        if (alldata.length > 0) {
            res.send(alldata)
        }
        else {
            res.send("no data found")
        }
    } catch (error) {
        res.send("error from get",error.message)
    }
})
notesRoutes.post("/addnotes", async (req, res) => {
    const {title,author} = req.body
    try {
        const alldata = await NotesModel.find({ title })
        if (alldata.length > 0) {
             res.send("note already exist create newone")
        }
        else {
         const newnote = new NotesModel({title,author})
          try {
             await newnote.save()
             res.send({msg:"Note has been added"})
          } catch (error) {
            res.send({msg:error.message})
          }
        }
    } catch (error) {
        res.send(error.message)
    }
})
    
notesRoutes.patch("/update/:id", async (req, res) => {
    const _id = req.params.id
    const body = req.body
    try {
        await NotesModel.findByIdAndUpdate(_id, body)
        res.send("data updated")
    } catch (error) {
        res.send(error)
    }
})
notesRoutes.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await NotesModel.findByIdAndDelete(id)
        res.send("hi from delete")
    } catch (error) {
        res.send("error")
    }
})
module.exports = { notesRoutes }