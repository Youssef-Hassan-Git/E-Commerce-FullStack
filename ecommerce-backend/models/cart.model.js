const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Product',
     required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {  
    type: Number,
    required: true
  },
  
      priceChanged: {
        type: Boolean,
        default: false,
      },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

isDeleted: {
  type:Boolean,
  default: false,
}
},
{
    timestamps: true
})

module.exports = mongoose.model('Cart',cartSchema);