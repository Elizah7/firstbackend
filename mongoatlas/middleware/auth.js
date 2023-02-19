
const jwt = require("jsonwebtoken")
const auth =  (req, res, next) => {
   const token = req.headers.authorization
   if (token) {
      const decoded = jwt.verify(token, "vampires")
      if (decoded) {
         next()
      }
      else {
         res.send("Login First")
      }
   }
   else {
      res.send("Login First")
   }
}

module.exports = { auth }