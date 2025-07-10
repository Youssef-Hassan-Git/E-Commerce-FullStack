const Testimonial = require('../models/testimonial.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")


exports.addTestimonial = catchAsync( async (req, res, next) => {
    
    const userId = req.user.id;

    const {title, description} = req.body;

    if (!title || !description) {
    return res.status(400).json({message: "title and description are required"})
    }


    const addedTestimonial = await Testimonial.create({
        title, description, user: userId
    })
    
    logger.info(`User Created new Testimonial, id is ${addedTestimonial._id}`)

        return res.status(201).json({ message : 'Testimonial Added', data: addedTestimonial});

})


exports.deActivateTestimonial = catchAsync( async (req, res, next) => {
    
    const {testimonialId} = req.params;


    const userTestimonial = await Testimonial.findOneAndUpdate({_id: testimonialId}, {isActive: false}, {new: true})

    
    if (!userTestimonial) {
        return res.status(404).json({message: "Testimonial not found."})
    }
    
    logger.info(`Admin DeActivated Testimonial, id is ${userTestimonial._id}`)

        return res.status(201).json({ message : 'Testimonial DeActivated'});

})

exports.activateTestimonial = catchAsync( async (req, res, next) => {
    
    const {testimonialId} = req.params;


    const userTestimonial = await Testimonial.findOneAndUpdate({_id: testimonialId}, {isActive: true}, {new: true})

    
    if (!userTestimonial) {
        return res.status(404).json({message: "Testimonial not found."})
    }
    
    logger.info(`Admin Activated Testimonial, id is ${userTestimonial._id}`)

        return res.status(201).json({ message : 'Testimonial Activated'});

})


exports.getTestimonials = catchAsync( async (req, res, next) => {


    const allTestimonials = await Testimonial.find({isActive: true})
        
    
    if (!allTestimonials.length) {
        return res.status(404).json({message: "Testimonials not found."})
    }
    

        return res.status(201).json({ message : 'List of Testimonials', data: allTestimonials});

})

exports.getAllTestimonials = catchAsync( async (req, res, next) => {


    const allTestimonials = await Testimonial.find()

    
    if (!allTestimonials.length) {
        return res.status(404).json({message: "Testimonials not found."})
    }
    

        return res.status(201).json({ message : 'List of Testimonials', data: allTestimonials});

})