const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ _id: this._id}, "TESTKEY", { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);