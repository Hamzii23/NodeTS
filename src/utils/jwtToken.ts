import { ObjectId } from 'mongodb'
import { promisify } from 'util'
var jwt = require('jsonwebtoken')

const jwtToken = async (userId: ObjectId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  })
}

const verifyJWTToken = async (token: string) => {
  const decord = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  return decord
}

export { jwtToken, verifyJWTToken }
