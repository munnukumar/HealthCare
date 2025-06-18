import morgan from 'morgan';
import logger from '../config/logger.js';

const stream = {
  write: (message) => logger.info(message.trim()),
};

const skip = () => {
  return process.env.NODE_ENV === 'test';
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;
