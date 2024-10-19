import { Request } from 'express'
import { User } from '../User/Schema'
import { AuthRequest, UserDocument } from '../User/types'
import { jwtToken } from '../../utils/jwtToken'
import sendEmail from '../../utils/email'
import { hashcrypto } from '../../utils/crypto'

class AuthFuns {
  async createUser(request: Request) {
    const newUser = await User.create({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      confirmPassword: request.body.confirmPassword,
      passwordChangeAt: request.body.passwordChangeAt,
      role: request.body.role,
    })
    const token = await jwtToken(newUser._id)
    return {
      message: 'Sucessfully Create New User',
      success: true,
      token: token,
      tourData: newUser,
    }
  }

  async loginUser(request: Request) {
    const { email, password } = request.body

    if (!email || !password) {
      return {
        success: false,
        message: !email ? 'Email Missing' : 'Password Missing',
        statusCode: 400,
      }
    }

    const getUser = await User.findOne<UserDocument>({ email: email }).select(
      '+password',
    )
    if (
      !getUser ||
      !(await getUser.correctPassword(password, getUser?.password))
    ) {
      return {
        success: false,
        message: 'Incorrect Email or Password Please Try Again!',
        statusCode: 401,
      }
    }
    const loginToken = await jwtToken(getUser._id)
    return {
      success: true,
      token: loginToken,
      statusCode: 200,
    }
  }

  async getAllUser() {
    const newUser = await User.find()
    if (newUser.length >= 1) {
      return {
        message: 'Not Record Found or already Deleted',
        success: true,
        tourData: newUser,
      }
    } else {
      return {
        message: 'Not Record Found or already Deleted',
        success: false,
        tourData: [],
      }
    }
  }

  async forgotPassword(request: Request) {
    // 1) Check the User with Email Does User Exist or Not.
    const { email } = request.body
    const user = await User.findOne<UserDocument>({ email: email })
    if (!user) {
      return {
        success: false,
        message: 'User Does Not Exist',
        statusCode: 404,
      }
    }

    // 2) Generate the Random Token with Instance Method
    const resetToken = await user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    // 3) send it back to user with Random Token
    const resetUrl = `${request.protocol}://${request.get('host')}/api/v1/users/resetPassword/${resetToken}`
    const message = `Forgot Your Password? Submit the request with new Password and Password Confirm to : ${resetUrl}.\nIf you did not forgot your password then ignore it `
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your Password Reset Token (Valid for 10m)',
        message: message,
      })
      return {
        success: true,
        message: 'Check Your Email',
        statusCode: 200,
      }
    } catch (error) {
      user.passwordResetExpires = undefined
      user.passwordResetToken = undefined
      await user.save({ validateBeforeSave: false })
      return {
        success: false,
        message: 'There was error Sending the Email Try again later',
        statusCode: 500,
      }
    }
  }

  async resetPassword(request: Request) {
    const { password, confirmPassword } = request.body
    // 1 get the user Reset Token in Header
    const hashToken = await hashcrypto(request.params.token)
    const user = await User.findOne<UserDocument>({
      passwordResetToken: hashToken,
      passwordResetExpires: { $gt: Date.now() },
    })
    // 2) if no user found or time expired then return Error and Message
    if (!user) {
      console.log('🚀 ~ UserFuns ~ resetPassword ~ user:', user)
      return {
        success: false,
        message: 'Invalid Token or Has Expired',
        statusCode: 400,
      }
    }
    // 3) Update the User Password and undefine the PasswordToken and PasswordExpires
    user.password = password
    user.confirmPassword = confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // 4) Update the passwordChangeAt proprty for user

    // 5) Login with New JWT Token
    const newToken = await jwtToken(user._id)
    return {
      success: true,
      message: 'SucessFully Reset the Password',
      statusCode: 200,
      token: newToken,
    }
  }

  async updatePassword(request: AuthRequest) {
    const user = await User.findById<UserDocument>(request.user?._id).select(
      '+password',
    )

    if (
      !user ||
      !(await user.correctPassword(request.body.currentPassword, user.password))
    ) {
      return {
        success: false,
        message: 'Incorrect Password Try Again with Valid Password',
        statusCode: 401,
      }
    }

    user.password = request.body.newPassword
    user.confirmPassword = request.body.newConfirmPassword
    await user.save()

    const newToken = await jwtToken(user._id)
    return {
      success: true,
      message: 'Sucessfully Update the Password',
      statusCode: 200,
      token: newToken,
      data: user,
    }
  }
}
export = new AuthFuns()
