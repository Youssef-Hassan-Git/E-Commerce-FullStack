const Order = require('../models/order.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");

exports.getTopSellingProducts = catchAsync(async (req, res, next) => {
  const topProducts = await Order.aggregate([
    { $unwind: "$products" }, // Expand each product in orders
    { $match: { status: { $ne: "cancelled" } } }, // Ignore cancelled orders
    {
      $group: {
        _id: "$products.product", // Group by product ID
        totalSold: { $sum: "$products.quantity" }
      }
    },
    { $sort: { totalSold: -1 } }, // Sort by quantity sold, descending
    { $limit: 4 }, 
    {
      $lookup: {
        from: "products", // MongoDB collection name
        localField: "_id",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" }, // Flatten the product array
    {
      $project: {
        _id: 0,
        productId: "$product._id",
        name: "$product.name",
        price: "$product.price",
        totalSold: 1,
        imgURL: "$product.imgURL",
        stock: "$product.stock"
      }
    }
  ]);

  return res.status(200).json({
    message: "Top 5 best-selling products",
    data: topProducts
  });
});
