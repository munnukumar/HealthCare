
import { createLogger, format, transports } from 'winston';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = format.printf(({ level, message, timestamp, ...meta }) => {
  const dayTime = dayjs().format('ddd HH:mm:ss');
  const route = meta.route || '-';
  const method = meta.method || '-';
  return `[${dayTime}] ${level.toUpperCase()} ${method} ${route} - ${message}`;
});

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDir, 'success.log'), level: 'info' }),
  ],
});

export default logger;
