const User = require('../models/user.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const bcrypt = require("bcrypt");

    exports.createUser= (role) => {
        return catchAsync( async (req,res, next)=>{
    const {name, email, password, confirmPassword, phone, gender, address}= req.body

    if(!['admin', 'user'].includes(role)){
        return next(new appError("invalid role creating user", 400))
    }
    const existing = await User.findOne({email})
    if(existing){
           return res.status(400).json({message:"Email Exists!"})
    }


    const user = await User.create({name, email,password,confirmPassword, role, phone, gender, address});
    return res.status(201).json({message:"Account Created Successfully!", user})
    })

    }

exports.getUsers = async(req,res)=>{
const users = await User.find();
return res.status(200).json({message:"list of users", data:users})
}


exports.updateUserProfile =  catchAsync( async (req, res , next)=> {
    const userId = req.user.id;
    let  {name, email, phone, gender, address}= req.body;
      
    if(!name && !email && !phone && !gender && !address){
        return res.status(400).json({message:"You must enter all the informations"})
    }

    const user = await User.findById(userId);

    if(email === user.email){
        return res.status(400).json({message:"Email already exists"})
    }
    
    

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name, email, phone, gender, address}
            , {new: true, runValidators: true}
        )


    return res.status(200).json({message:"User Profile Updated Successfully", data:updatedUser})

})


exports.getUserProfile = catchAsync( async (req, res, next)=>{  
    const userId = req.user.id;

    const user = await User.findById(userId);


    return res.status(200).json({message:"User Profile", data:user})
})




