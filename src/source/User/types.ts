import { Request } from 'express'
import mongoose from 'mongoose'

interface UserMethods {
  changedPasswordAfter(JAWTimestap: string): Promise<boolean>
  createPasswordResetToken(): Promise<boolean>
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>
}
export interface UserDocument extends mongoose.Document, UserMethods {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  photo?: string
  password: string
  confirmPassword?: string
  passwordChangeAt: Date
  role: string
  passwordResetToken: string | undefined
  passwordResetExpires: number | undefined
  active: boolean
}

export interface AuthRequest extends Request {
  user?: UserDocument
}
