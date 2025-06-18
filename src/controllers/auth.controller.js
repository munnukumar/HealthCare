
import { registerUser, loginUser, refreshAccessToken } from '../services/auth.service.js';
import { ErrorResponse } from '../lib/error.res.js';
import { SuccessResponse } from '../lib/success.res.js';

export const register = async (req, res, next) => {
  try {
    const data = await registerUser(req.body);
    return SuccessResponse.created(res, data, 'User registered successfully');
  } catch (error) {
    next(ErrorResponse.internalServerError(error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);
    return SuccessResponse.ok(res, data, 'User logged in successfully');
  } catch (error) {
    next(ErrorResponse.unauthorized(error.message));
  }
};

export const refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const data = await refreshAccessToken(refreshToken);
      return SuccessResponse.ok(res, data, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  };
