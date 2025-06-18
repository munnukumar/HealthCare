
class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.status = statusCode;
    }
  
    static badRequest(message = 'Bad request') {
      return new ErrorResponse(message, 400);
    }
  
    static unauthorized(message = 'Unauthorized') {
      return new ErrorResponse(message, 401);
    }
  
    static forbidden(message = 'Forbidden') {
      return new ErrorResponse(message, 403);
    }
  
    static notFound(message = 'Resource not found') {
      return new ErrorResponse(message, 404);
    }
  
    static conflict(message = 'Conflict') {
      return new ErrorResponse(message, 409);
    }
  
    static unprocessableEntity(message = 'Unprocessable entity') {
      return new ErrorResponse(message, 422);
    }
  
    static tooManyRequests(message = 'Too many requests') {
      return new ErrorResponse(message, 429);
    }
  
    static internalServerError(message = 'Internal server error') {
      return new ErrorResponse(message, 500);
    }
  
    static serviceUnavailable(message = 'Service unavailable') {
      return new ErrorResponse(message, 503);
    }
  }
  
  export { ErrorResponse };
  