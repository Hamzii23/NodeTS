import mongoose from 'mongoose'
import validator from 'validator'
import { UserDocument } from './types'
import crypto, { createHash } from 'crypto'
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User Must have Name'],
  },
  email: {
    type: String,
    required: [true, 'A User Must have Email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide Valid Email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guid', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A User Must have Password'],
    maxlength: [25, 'Password must be below 25 characters'],
    minlength: [10, 'Password must be above 10 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'A User Must have Password'],
    validate: {
      // only be used in Create and Save
      validator: function (this: UserDocument, el: String) {
        return el === this.password
      },
    },
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Number,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
})

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined
  next()
})

userSchema.pre('save', async function (this: UserDocument, next) {
  if (!this.isModified || this.isNew) return next()
  this.passwordChangeAt = new Date(Date.now() - 1000)
  next()
})

userSchema.pre(
  /^find/,
  async function (this: mongoose.Query<any, UserDocument>, next) {
    this.find({ active: { $ne: false } })
    next()
  },
)

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = async function (
  this: UserDocument,
  JAWTimestap: number,
) {
  const changeTimestap = Math.floor(this.passwordChangeAt.getTime() / 1000)
  if (this.passwordChangeAt) {
    return JAWTimestap < changeTimestap
  }
  return false
}

userSchema.methods.createPasswordResetToken = async function (
  this: UserDocument,
) {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  return resetToken
}

export const User = mongoose.model('User', userSchema)
