const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },


  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
}, {
  timestamps: true
});

module.exports = mongoose.model('testimonials', testimonialsSchema);
