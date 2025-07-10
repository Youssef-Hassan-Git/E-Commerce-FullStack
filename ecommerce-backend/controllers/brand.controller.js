const Brand = require('../models/brand.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")

exports.addBrand = catchAsync( async (req, res, next) => {
    const {brandName} = req.body;
    
    if(!brandName){
  return res.status(400).json({ message : 'Brand Required.'});
    }


    const existing = await Brand.findOne({brandName, isDeleted: false});
    if(existing){
  return res.status(409).json({ message : 'Brand Exist'});
      
}


    const myBrand = await Brand.create({
        brandName
    })
    logger.info(`Admin Created new Brand, Brand id is ${myBrand._id}`)

        return res.status(201).json({ message : 'Brand Added', data: myBrand});


})


exports.getBrands = catchAsync( async (req, res , next)=> {
    const allBrands = await Brand.find({ isDeleted: false})
      return res.status(200).json({ message: "List of Brands", data: allBrands });

})

exports.deleteBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedBrand= await Brand.findByIdAndUpdate(
    id,     
    { isDeleted: true },
    { new: true, runValidators: true });

  if (!deletedBrand) {
    return next(new appError("brand not found", 404));
  }

  return res.status(200).json({ message: "Brand deleted successfully", data: deletedBrand });
});