const subCategory = require('../models/subcategory.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")
const Category = require('../models/category.model');

exports.addSubCategory = catchAsync( async (req, res, next) => {

    const {subCategoryName, categoryName } = req.body;

    if(!subCategoryName || !categoryName){
        return res.status(400).json({message: "SubCategory Name and category name is required"})
    }

    const category = await Category.findOne({ categoryName });



    const existing = await subCategory.findOne({subCategoryName, categoryId: category._id, isDeleted: false});
    if(existing){
      return res.status(400).json({message: "SubCategory already Exist"})
    }

    const addedSubCategory = await subCategory.create({
        subCategoryName, categoryId: category._id
    })

    const returnedSubCategory = await addedSubCategory.populate('categoryId', 'categoryName');

    logger.info(`Admin Created new Category, Category id is ${addedSubCategory._id}`)

        return res.status(201).json({ message : 'SubCategory Added Successfully', data: returnedSubCategory});


})


exports.getSubCategories = catchAsync( async (req, res , next)=> {
    const allSubCategories = await subCategory.find({ isDeleted: false}).populate('categoryId', 'categoryName');
      return res.status(200).json({ message: "List of subCategories", data: allSubCategories });

})

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedSubCategory = await subCategory.findByIdAndUpdate(
    id,     
    { isDeleted: true },
    { new: true, runValidators: true });

  if (!deletedSubCategory) {
    return res.status(404).json({message: "Category not found."})
  }

  return res.status(200).json({ message: "SubCategory Deleted Successfully", data: deletedSubCategory });
});