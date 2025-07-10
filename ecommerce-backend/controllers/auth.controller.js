const User = require("../models/user.model")
const jwt = require("jsonwebtoken");

const signToken =(user) => {
    return jwt.sign({id: user._id, role: user.role, name:user.name},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
    )
}

exports.login = async (req, res )=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user ){
        return res.status(400).json({message: "Email or password invalid"})
    }
    if(user.email !== email){
        return res.status(400).json({message: "Email or password invalid"})
    }
    const isMatch = await user.correctPassword(password);
    if(!isMatch){
        return res.status(400).json({message: "Email or password invalid"})
    }
    const token = signToken(user);

return res.status(200).json(
  { message: "Logged In Successfully", accessToken: token }
);
}