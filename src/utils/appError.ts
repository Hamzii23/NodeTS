type StatusCode = string

class AppError extends Error {
  statusCode: StatusCode
  operational: boolean
  status: string
  constructor(message: string, statusCode: StatusCode) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.operational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
