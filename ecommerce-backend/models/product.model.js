const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },



  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String
  },
  imgURL: String,


  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },



  categoryId:{
type: mongoose.Schema.Types.ObjectId,
ref: 'Category'
  },


    subCategoryId:{
type: mongoose.Schema.Types.ObjectId,
ref: 'SubCategory'
  },

  stock: {
    type: Number,
    required: true,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default:false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
