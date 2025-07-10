const mongoose = require('mongoose');

const subCategory = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
    trim: true
  },

  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    
  },

  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default:false
  }


}




, {
  timestamps: true
});

module.exports = mongoose.model('SubCategory', subCategory);
