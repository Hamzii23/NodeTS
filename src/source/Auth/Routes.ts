import express from 'express'
import {
  forgotPassword,
  login,
  resetPassword,
  signUp,
  updatePassword,
} from './UserAuthController'
import { protect } from '../../middlewares/protect'
const AuthRoutes = express.Router()

AuthRoutes.post('/signup', signUp)
AuthRoutes.post('/login', login)
AuthRoutes.post('/forgotPassword', forgotPassword)
AuthRoutes.patch('/resetPassword/:token', resetPassword)
AuthRoutes.patch('/updatePassword', protect, updatePassword)

export default AuthRoutes
