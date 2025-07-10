const Product = require('../models/product.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const subCategory = require('../models/subcategory.model');


exports.addProduct = catchAsync(async (req, res, next) => {
  const { name, price, desc, brandName, categoryName, subCategoryName, stock} = req.body;

  if (!req.file) {
 return res.status(404).json({ message : 'No img found.'});

}

  const imgURL = req.file.path;


const category = await Category.findOne({ categoryName: categoryName.trim() });
if (!category) {
  return res.status(404).json({ message : 'No category was found with the specified name.'});
}

const subcategory = await subCategory.findOne({ subCategoryName: subCategoryName.trim() });
if (!subcategory) {
  return res.status(404).json({ message : 'No subcategory was found with the specified name.'});
}

const brand = await Brand.findOne({ brandName: brandName.trim() });
if (!brand) {
  return res.status(404).json({ message : 'No brand was found with the specified name.'});
}
    const addedProduct = await Product.create({name, price, desc, imgURL,  brandId: brand._id , categoryId: category._id, subCategoryId: subcategory._id, stock});

    // category, subcategory, brand


    const returnedProducts = await Product.findById(addedProduct._id)
      .populate("brandId", "brandName")
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName");

    logger.info(`Admin Created new product, product id is ${addedProduct._id}`)


    return res.status(201).json({ message : 'Product Created Successfully', data: returnedProducts});



    })


exports.getProducts = catchAsync(async (req, res) => {
  const { result, page, limit, totalPages, totalResult } = res.paginatedResults;

  const allProducts = await Product.populate(result, [
    { path: "brandId", select: "brandName" },
    { path: "categoryId", select: "categoryName" },
    { path: "subCategoryId", select: "subCategoryName" },
  ]);

  return res.status(200).json({
    message: "List of Products",
    data: allProducts,
    pagination: {
      page,
      limit,
      totalPages,
      totalResult,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) =>{
   const { id } = req.params;
    const { name, price, desc, brandName, categoryName, subCategoryName, stock} = req.body;

  if (!req.file) {
      return next(new appError("Image is required", 400));
    }

    const imgURL = req.file.path;


  const category = await Category.findOne({ categoryName: categoryName.trim() });
  if (!category) {
  return res.status(404).json({ message : 'No category was found with the specified name.'});
  }

  const subcategory = await subCategory.findOne({ subCategoryName: subCategoryName.trim() });
  if (!subcategory) {
  return res.status(404).json({ message : 'No subcategory was found with the specified name.'});
  }

  const brand = await Brand.findOne({ brandName: brandName.trim() });
  if (!brand) {
  return res.status(404).json({ message : 'No brand was found with the specified name.'});
  }

  const updatedProduct = await Product.findOneAndUpdate(
   { _id: id, isDeleted: false},

    { name, price, desc, imgURL, brandId: brand._id, categoryId: category._id, subCategoryId: subcategory._id,
      stock,
    },

    { new: true, runValidators: true }
  );

    if (!updatedProduct) {
      return next(new appError("Product not found or has been deleted", 404));
    }

      const returnedProducts = await Product.findById(updatedProduct._id)
      .populate("brandId", "brandName")
      .populate("categoryId", "categoryName")
      .populate("subCategoryId", "subCategoryName");

    logger.info(`Admin Updated  product, product id is ${returnedProducts._id}`)

    return res.status(200).json({ message : 'Product updated successfully', data: returnedProducts});


})


exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );

  if (!deletedProduct) {
    return next(new appError("Product not found", 404));
  }

  return res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
});


exports.getProductById =  catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("brandId", "brandName")
  .populate("categoryId", "categoryName")
  .populate("subCategoryId", "subCategoryName");
  if(!product){
    res.status(404).json({message: "Product not found."})
    }

  return res.status(200).json({ message: "Product details: ", data: product });
});


exports.relatedProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const currentProduct = await Product.findById(id);
  if (!currentProduct) {
    return res.status(404).json({ message: "Product not found." });
  }

  const relatedProducts = await Product
    .where('_id').ne(id)
    .where('categoryId').equals(currentProduct.categoryId)
    .limit(5)
    .populate("brandId", "brandName")
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName");


  return res.status(200).json({ message: "Products details: ", data: relatedProducts });
});



