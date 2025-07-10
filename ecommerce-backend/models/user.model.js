const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: "user"
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['M', 'F']
  },
  address: {
    fulladdress: { type: String, required: true },

  }
}, {
  timestamps: true
});





userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (this.confirmPassword) {
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
  }
  next();
});

userSchema.methods.correctPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
