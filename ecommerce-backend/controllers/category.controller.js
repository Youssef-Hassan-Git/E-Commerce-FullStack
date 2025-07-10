const Category = require('../models/category.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")

exports.addCategory = catchAsync( async (req, res, next) => {

    const {categoryName} = req.body;

    if(!categoryName){
  return res.status(400).json({ message : 'Category Required.'});
    }

    const existing = await Category.findOne({categoryName, isDeleted: false});
    if(existing){
  return res.status(409).json({ message : 'Category Exists'});
      
}

    const addedCategory = await Category.create({
        categoryName
    })
    
    logger.info(`Admin Created new Category, Category id is ${addedCategory._id}`)

        return res.status(201).json({ message : 'Category Added', data: addedCategory});


})


exports.getCategories = catchAsync( async (req, res , next)=> {
    const allCategories = await Category.find({isDeleted: false})
      return res.status(200).json({ message: "List of Categories", data: allCategories });

})

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedCategory = await Category.findByIdAndUpdate(
    id,     
    { isDeleted: true },
    { new: true, runValidators: true });

  if (!deletedCategory) {
    return res.status(404).json({message: "Category not found."})
  }

  return res.status(200).json({ message: "Category Deleted Successfully", data: deletedCategory });
});