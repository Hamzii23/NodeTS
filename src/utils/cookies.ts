import { Response } from 'express'

export const Cookies = (response: Response, token: string) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  response.cookie('jwt', token, cookieOptions)
}
