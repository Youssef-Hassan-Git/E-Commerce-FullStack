const Cart = require('../models/cart.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util");
const Product = require('../models/product.model');


exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user?.id;

  const product = await Product.findOne({ _id: productId, isDeleted: false, isActive: true });

  if (!product) {
    return res.status(404).json({message: "Product not found."})
  }

  if (product.stock <= 0) {
    return res.status(400).json({ message: "Product is out of stock" });
  }   

  let cartItem = await Cart.findOne({ product: productId, user: userId, isDeleted: false });
  if(cartItem){
    if (cartItem.quantity + 1 > product.stock) {
      return res.status(200).json({ 
        message: `Cannot add more items. Available stock: ${product.stock}, Current in cart: ${cartItem.quantity}` 
      });
    }
    
    cartItem.quantity+= 1;
    cartItem.price = product.price * cartItem.quantity;
    await cartItem.save();
  } else {
    cartItem = await Cart.create({
      product: product._id,
      price: product.price,
      user: userId,
      isDeleted: false
    });
  }

  logger.info(`Cart updated: ${cartItem._id}`);

  return res.status(201).json({ message: 'Added to cart', data: cartItem });
});

exports.displayUserCart = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const cartItems = await Cart.find({ user: userId, isDeleted: false })
      .populate("product", "name price desc imgURL brandId categoryId subCategoryId");
    
    logger.info(`User ${userId} Accessing Cart items: ${cartItems}`);
    return res.status(200).json({ message: "User Cart", data: cartItems });
});


exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.id; 
  if(!productId){
    return next(new appError("Product ID is required in request body", 400));
  }
    
  const product = await Product.findOne({ _id: productId, isDeleted: false, isActive: true });
  const cartItem = await Cart.findOne({ product: productId, user: userId, isDeleted: false });

  if (!cartItem) {
      return res.status(404).json({ message: 'No cart items'});
  }

  if(cartItem.quantity > 1){
    cartItem.quantity -=1;
    cartItem.price = product.price * cartItem.quantity;
    await cartItem.save();
    return res.status(200).json({ message: 'Removed one item from cart', data: cartItem });
  }

  if(cartItem.quantity === 1){
    const deletedItem = await Cart.findOneAndUpdate({ product: productId, user: userId, isDeleted: false }, {isDeleted: true});
    logger.info(`Cart item deleted: ${deletedItem._id}`);
    return res.status(200).json({ message: 'Removed from cart completely (quantity was 1)' });
  }
}); 