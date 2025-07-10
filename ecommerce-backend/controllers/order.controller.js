
  const catchAsync = require("../utils/catch-async.util");
  const appError = require("../utils/app-error.util");
  const logger = require("../utils/logger.util")
  const Order = require("../models/order.model");
  const Cart = require('../models/cart.model');
  const Product = require('../models/product.model');
  const User = require('../models/user.model');

  exports.addOrder = catchAsync(async (req, res, next) => {
    const userId = req.user._id;

    const cartItems = await Cart.find({ user: userId, isDeleted: false }).populate('product');

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${item.product.name}. Available: ${item.product.stock}, Requested: ${item.quantity}` 
        });
      }
    }

    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(404).json({ message: "Address Required" });
    }

    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);
      product.stock = product.stock - item.quantity;
      await product.save();
    }

    let totalPrice = 0;
    const orderProducts = cartItems.map(item => {
      totalPrice += item.price;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const newOrder = await Order.create({
      user: userId,
      products: orderProducts,
      totalPrice,
      shippingAddress,
    });

    await Cart.updateMany(
      { user: userId, isDeleted: false },
      { isDeleted: true }
    );

    logger.info(`User Created new Order, id is ${newOrder._id}`)

    return res.status(201).json({ 
      message: "Order Successfull", 
      data: newOrder
    });
  });

  exports.updateOrder = catchAsync(async (req, res, next) => {
      const {newStatus} = req.body;
      const {id} = req.params;
      
      if(!newStatus){
        return res.status(404).json({ message: "status Required" });  
      }
      
      const order = await Order.findById(id).populate('products.product').populate('user');
      
      if(!order){
        return res.status(404).json({ message: "Order Not Found" });
      }

      if (newStatus === 'cancelled' && order.status !== 'cancelled') {
        for (const item of order.products) {
          const product = await Product.findById(item.product._id);
          product.stock = product.stock + item.quantity;
          await product.save();
        }

        logger.info(`Stock restored for cancelled order: ${order._id}`);
      }
      if(newStatus === 'preparing' && order.status === 'placed'){
        for (const item of order.products) {
          const product = await Product.findById(item.product._id);
          product.stock = product.stock - item.quantity;
          await product.save();
        }
      }
      const updatedOrder = await Order.findByIdAndUpdate(
        id, 
        {status: newStatus }, 
        {new: true, runValidators:true}
      );
      
      logger.info(`Admin Updated Order status to ${newStatus}, id is ${updatedOrder._id}`)

      return res.status(200).json({message: "Order Status Updated", status: updatedOrder})
  });



  exports.deleteOrder = catchAsync(async (req, res, next) => {
      const {id} = req.params;
      
      if(!id){
        return res.status(404).json({ message: "Order Required" });
      }
      
      const order = await Order.findByIdAndUpdate(id, {isDeleted: true}, {new: true, runValidators: true});
      
      if(!order){
        return res.status(404).json({ message: "Order Required" });
      }
      
      logger.info(`Admin deleted order, id is ${order._id}`)

      return res.status(201).json({message: "Order deleted successfully", data: order})
  });

  exports.getAllOrder = catchAsync(async (req, res, next) => {
    const order = await Order.find({isDeleted: false})
      .populate('user', 'name email phone address')
      .populate('products.product', 'name price desc imgURL _id');
    
    if(!order || order.length === 0){
      return res.status(404).json({ message: "No Orders Found" });
    }
    
    logger.info(`Admin fetched all order, id is ${order._id}`)

    return res.status(200).json({message: "Order fetched successfully", data: order})
  })

  exports.getUserOrder = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const order = await Order.find({user: userId, isDeleted: false})
      .populate('user', 'name email phone address')
      .populate('products.product', 'name price desc imgURL');
    
    if(!order || order.length === 0){
      return res.status(404).json({ message: "No Orders Found" });
    }
    
    logger.info(`User fetched his order, id is ${order._id}`)
    return res.status(200).json({message: "Order fetched successfully", data: order})
  })
