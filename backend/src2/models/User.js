import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
}, { timestamps: true });

// NO next() function - Direct sync approach
userSchema.pre('save', function() {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compareSync(candidate, this.password);
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);