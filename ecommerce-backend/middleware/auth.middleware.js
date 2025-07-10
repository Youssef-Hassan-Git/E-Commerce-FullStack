const jwt = require ("jsonwebtoken");
const User = require("../models/user.model")


exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    
    if (!authHeader.startsWith("Bearer"))
    {
        res.status(401).json({message: "No token Provided"})
    }
    const token = authHeader.split(" ")[1]
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id).select('-password');
        if(!req.user) return res.status(401).json({message: "User not found"})

        next();
    }
    catch(err){
       return res.status(403).json({message: 'token expired or invalid'})
    }
}