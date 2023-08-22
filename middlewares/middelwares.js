const jwt = require('jsonwebtoken')




////need expline here
const verifyToken = (req,res,next) =>{

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

   
    if (!token) {
        return res.status(401).json({msg:"No token provided"})
    }


    jwt.verify(token,process.env.JWT_KEY, (err, decoded)=>{

        if (err) {
            return res.status(401).json({msg:"Invalid Token"})
        }
        req.decoded= decoded;
        next();
    })

}

module.exports = verifyToken