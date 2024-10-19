import { filterRequestFileds } from '../../utils/filterFileds'
import { User } from './Schema'
import { AuthRequest } from './types'

class UserFuns {
  async getAllUser() {
    const user = await User.find()
    if (!user) {
      return {
        success: false,
        message: 'Not Record Found or already Deleted',
        statusCode: 400,
      }
    }
    return {
      message: 'All User Record',
      success: true,
      data: user,
      statusCode: 200,
    }
  }

  async updateMe(request: AuthRequest) {
    if (request.body.password || request.body.confirmPassword) {
      return {
        success: false,
        message: 'Update Password are not allow in this Route.',
        statusCode: 404,
      }
    }
    const fillterFields = filterRequestFileds(request.body, 'name')
    const updatedUser = await User.findByIdAndUpdate(
      request.user?._id,
      fillterFields,
      {
        new: true,
        runValidators: true,
      },
    )
    return {
      success: true,
      message: 'Update Profile Sucessfully',
      statusCode: 200,
      data: updatedUser,
    }
  }

  async deleteMe(request: AuthRequest) {
    const updatedUser = await User.findByIdAndUpdate(request.user?._id, {
      active: false,
    })
    return {
      success: true,
      message: 'Account Delete Sucessfully',
      statusCode: 204,
      data: null,
    }
  }
}

export = new UserFuns()
