const AboutUs = require('../models/aboutus.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")

exports.addAboutUs = catchAsync( async (req, res, next) => {

    const {title, description} = req.body;

    if (!title || !description) {
    return next(new appError("title and description are required", 400));
    }

    const existing = await AboutUs.findOne({title});
    if(existing){
    return next(new appError("About us already Exist", 400))
    }

    const addedAboutUs = await AboutUs.create({
        title, description
    })
    
    logger.info(`Admin Created new About Us, id is ${addedAboutUs._id}`)

        return res.status(201).json({ message : 'About Us Added', data: addedAboutUs});

})


exports.updateAboutUs = catchAsync(async (req, res, next) => {
  const {aboutId} = req.params;
  const { title, description } = req.body;

  if (!title && !description) {
    return next(new appError("title or description is required", 400));
  }

  const updatedAboutUs = await AboutUs.findByIdAndUpdate(
    aboutId,
    { title, description },
    { new: true, runValidators: true }
  );

  if (!updatedAboutUs) {
    return res.status(404).json({ message: "AboutUs Not Found." });
  }

  return res.status(200).json({ message: "About Us updated successfully", data: updatedAboutUs });
});

exports.getAboutUs = catchAsync( async (req, res, next) => {


    const getAboutUs = await AboutUs.find({ isDeleted: false })

    
    if (!getAboutUs) {
      return res.status(404).json({ message: "AboutUs Not Found." });
    }
    

        return res.status(201).json({ message : 'About Us:', data: getAboutUs});

})

exports.deleteAboutUs = catchAsync(async (req, res, next) => {
  const { aboutId } = req.params;

  const deletedAboutUs = await AboutUs.findByIdAndUpdate(aboutId, { isDeleted: true });
      
  if (!deletedAboutUs) {
    return res.status(404).json({ message: "AboutUs Not Found." });
  }
  return res.status(200).json({ message: "About Us soft deleted successfully" });
});