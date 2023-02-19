
const fs = require("fs")
const Logger =(req,res,next)=>{
       const method = req.method;
       const date = Date()
       fs.appendFileSync("logger.txt",`\nMetthod:${method}and, Date:${date}`)
       next()
}

module.exports = {Logger}