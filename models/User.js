const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.checkPassword = function (passwordAttempt) {
  return bcrypt.compare(passwordAttempt, this.password);
};

userSchema.methods.withoutPassword = function () {
  const { password, ...userWithoutPassword } = this.toObject();
  return userWithoutPassword;
};

module.exports = mongoose.model("User", userSchema);