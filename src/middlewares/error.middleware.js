
import logger from '../config/logger.js';

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(message, {
    route: req.originalUrl,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

export default globalErrorHandler;
