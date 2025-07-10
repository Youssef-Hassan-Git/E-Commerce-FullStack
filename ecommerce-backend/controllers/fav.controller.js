const Fav = require('../models/fav.model');
const catchAsync = require("../utils/catch-async.util");
const appError = require("../utils/app-error.util");
const logger = require("../utils/logger.util")
const Product = require('../models/product.model');



exports.addFav = catchAsync( async (req, res, next) => {

    const userId = req.user.id;
    const {productId} = req.params;

    if (!productId) {
    return next(new appError('Product not found', 400));
  }


  const alreadyExists = await Fav.findOne({ user: userId, product: productId, isAdded: true});
  if (alreadyExists) {
   return res.status(400).json({ message: 'Product already in favorites' });
  }


  const addedFav = await Fav.create({
    product: productId, user: userId, isAdded: true
  })

    logger.info(`User ${userId} added product ${productId} to favorites`);

 return res.status(201).json({ message: 'Added to favorites', data: addedFav });

})

exports.removeFav = catchAsync( async (req, res, next) => {

  const { productId } = req.params;
    const userId = req.user.id;
    const deletedFavItem = await Fav.findOneAndUpdate({product: productId, user: userId, isAdded: true}, {isAdded: false})
    if(! deletedFavItem) {  
        logger.error(`User ${userId} tried to remove product ${productId} from favorites but it was not found`);
        
        return res.status(404).json({ message : 'Fav not found'});
    }


    logger.info(`User ${userId} removed product ${productId} from favorites`);

    return res.status(201).json({ message : 'Deleted Favourite Item Successfully:'});

})


exports.getFav = catchAsync( async (req, res, next) => {

    const userId = req.user.id;
    const getFav = await Fav.find({user: userId, isAdded: true}).populate('product', 'name price imgURL')
    
    if (!getFav.length) {
        return next(new appError('Fav not found', 404));
    }
    logger.info(`User ${userId} fetched favorites`);

  return  res.status(200).json({ message : 'Fav:', data: getFav});

})

