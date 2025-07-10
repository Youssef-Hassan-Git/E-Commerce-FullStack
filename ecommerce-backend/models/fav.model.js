const mongoose = require('mongoose');

const favSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',    
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
  isAdded:{
    type:Boolean,
    default:false
  }
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Fav', favSchema);
