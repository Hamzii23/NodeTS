import { StatusCodes, getReasonPhrase } from 'http-status-codes'

class StatusCode {
  static INTERNAL_SERVER = StatusCodes.INTERNAL_SERVER_ERROR
  static BAD_REQUEST = StatusCodes.BAD_REQUEST
}
export default StatusCode
