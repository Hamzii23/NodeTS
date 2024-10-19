import express from 'express'
import { deleteMe, getAllUsers, updateMe } from './Controller'
import { protect } from '../../middlewares/protect'

const userRoutes = express.Router()

userRoutes.get('/getAllUser', getAllUsers)
userRoutes.patch('/updateMe', protect, updateMe)
userRoutes.delete('/deleteMe', protect, deleteMe)

export default userRoutes
