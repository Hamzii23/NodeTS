import { createLogger, format, transports } from 'winston'
const { combine, timestamp, json, colorize } = format

const consoleFormat = combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}:${message}:${timestamp}`
  }),
)

const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleFormat,
    }),
    // new transports.File({ filename: 'app.logs' }),
  ],
})

export default logger
