const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
      type: Number,
      required: true,
    },
     
    },
  ],

  isDeleted: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ['placed', 'preparing', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  shippingAddress: {
    type: String,
    required: true
  },
  placedAt: {
    type: Date,
    default: Date.now
  },
  shippedAt: Date,
  deliveredAt: Date,
  cancelledAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
