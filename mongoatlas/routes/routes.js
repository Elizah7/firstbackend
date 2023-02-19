
const { StudentModel } = require("../models/usermodel")
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const app = express();
const userRoutes = express.Router()

app.use(express.json())
userRoutes.get("/", async (req, res) => {
   const query = req.query
   try {
      const alldata = await StudentModel.find(query)
      if (alldata.length > 0) {
         res.send(alldata)
      }
      else {
         res.send("no data found")
      }
   } catch (error) {
      res.send("error from get")
   }
})
userRoutes.post("/register", async (req, res) => {
   const { email, full_name, password, age } = req.body
   try {
      const alldata = await StudentModel.find({ email })
      if (alldata.length > 0) {
         res.send("user already exist,please login")
      }
      else {
         bcrypt.hash(password, 5, async (err, hash) => {
            if (err) res.send(err.message)
            const newdata = new StudentModel({ email, password: hash, age, full_name })
            try {
               await newdata.save()
               res.send("user has been added")
            } catch (error) {
               res.send("wrong credentials")
            }
         });
      }
   } catch (error) {
      res.send(error.message)
   }
})
userRoutes.post("/login", async (req, res) => {
   const { email, password } = req.body
   try {
      const alldata = await StudentModel.find({ email })
      if (alldata.length > 0) {
         const userauth = bcrypt.compareSync(password, alldata[0].password)
         if (userauth) {
            const token = jwt.sign({ course: alldata[0]._id }, "vampires")
            req.headers = token
            res.send(token)
         }
         else {
            res.send("err")
         }
      }
      else {
         res.send("wrong credentials")
      }
   } catch (error) {
      res.send(error.message)
   }
})
userRoutes.patch("/update/:id", async (req, res) => {
   const _id = req.params.id
   const body = req.body
   try {
      await StudentModel.findByIdAndUpdate(_id, body)
      res.send("data updated")
   } catch (error) {
      res.send(error)
   }
})
userRoutes.delete("/delete/:id", async (req, res) => {
   const id = req.params.id
   try {
      await StudentModel.findByIdAndDelete(id)
      res.send("hi from delete")
   } catch (error) {
      res.send("error")
   }
})
module.exports = { userRoutes }