const Faq = require('../models/faq.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")



exports.addFaq = catchAsync( async (req, res, next) => {

    const {question, answer} = req.body;

    if (!question || !answer) {
    return next(new appError("question and answer are required", 400));
    }

    const existing = await Faq.findOne({question});
    if(existing){
    return next(new appError("Question already Exist", 400))
    }

    const addedFaq = await Faq.create({
        question, answer
    })
    
    logger.info(`User Created new Faq, id is ${addedFaq._id}`)

        return res.status(201).json({ message : 'Faq Added', data: addedFaq});

})

exports.deActivateFaq = catchAsync(async (req, res, next) => {
  const {faqId} = req.params;

  const updatedFaq = await Faq.findByIdAndUpdate(
    {_id: faqId},
    { isActive: false},
    { new: true, runValidators: true }
  );

  if (!updatedFaq) {
    return next(new appError("Faq entry not found", 404));
  }
    logger.info(`Admin DeActivated Faq, id is ${updatedFaq._id}`)

  return res.status(200).json({ message: "Faq DeActivated successfully" });
});

exports.activateFaq = catchAsync(async (req, res, next) => {
  const {faqId} = req.params;

  const updatedFaq = await Faq.findByIdAndUpdate(
    {_id: faqId},
    { isActive: true},
    { new: true, runValidators: true }
  );

  if (!updatedFaq) {
    return next(new appError("Faq entry not found", 404));
  }
    logger.info(`Admin Activated Faq, id is ${updatedFaq._id}`)

  return res.status(200).json({ message: "Faq Activated successfully" });
});

exports.getFaq = catchAsync( async (req, res, next) => {


    const getFaq = await Faq.find({isActive: true})

    
    if (!getFaq.length) {
        return res.status(404).json({message: "Faq not found."})
    }
    

        return res.status(201).json({ message : 'Faq:', data: getFaq});

})


exports.getAllFaq = catchAsync(async (req, res, next) => {
  const allFaq = await Faq.find();

  if (!allFaq.length) {
    return next(new appError('No FAQs found', 404));
  }

  return res.status(200).json({ message: 'All FAQs', data: allFaq });
});