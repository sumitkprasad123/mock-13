var jwt = require('jsonwebtoken');


const auth = (req,res,next) => {
   const token = req.headers.authorization
   let d = new Date()
   date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
   console.log(token)
   if(token){
     const decoded = jwt.verify(token, 'sumit');
     console.log(decoded)
        if(decoded){
            req.body.userID = decoded.userID
            req.body.date = date 
            next()
        }else{
            res.send({"msg":"Login "})
        }
   }else{
     res.send({"msg":"Login First"})
   }
}

module.exports = {
    auth
}