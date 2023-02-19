const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    full_name: { type: String, required: true },
    email:{type:String,required:true},
    password:{type:String,required:true},
    age: {type:Number,required:true}
})

  
const StudentModel = mongoose.model("user", studentSchema)

module.exports = {StudentModel}