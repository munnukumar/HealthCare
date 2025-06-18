// === src/services/auth.service.js ===

import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from '../config/redis.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import { ErrorResponse } from '../lib/error.res.js';

const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days in seconds

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw ErrorResponse.conflict('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const accessToken = generateAccessToken(newUser.id);
  const refreshToken = generateRefreshToken(newUser.id);

  console.log("ref :", refreshToken)
  // Store refresh token in Redis with expiry
  await redis.set(`refresh:${newUser.id}`, refreshToken, 'EX', REFRESH_TOKEN_EXPIRY);

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw ErrorResponse.notFound('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw ErrorResponse.unauthorized('Invalid credentials');

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Store refresh token in Redis
  await redis.set(`refresh:${user.id}`, refreshToken, 'EX', REFRESH_TOKEN_EXPIRY);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (token) => {
  if (!token) throw ErrorResponse.badRequest('Refresh token is required');

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const key = `refresh:${payload.userId}`;
    const storedToken = await redis.get(key);

    if (!storedToken || storedToken !== token) {
      throw ErrorResponse.unauthorized('Invalid or expired refresh token');
    }

    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    await redis.set(key, newRefreshToken, 'EX', REFRESH_TOKEN_EXPIRY);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    throw ErrorResponse.unauthorized('Invalid or expired refresh token');
  }
};









// // === src/services/auth.service.js ===

// import prisma from '../config/db.js';
// import bcrypt from 'bcrypt';
// import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
// import { ErrorResponse } from '../lib/error.res.js';

// export const registerUser = async ({ name, email, password }) => {
//   const existingUser = await prisma.user.findUnique({ where: { email } });

//   if (existingUser) {
//     throw ErrorResponse.conflict('Email already registered');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   const accessToken = generateAccessToken(newUser.id);
//   const refreshToken = generateRefreshToken(newUser.id);

//   // Optional: Store refreshToken in DB for invalidation support
//   await prisma.user.update({
//     where: { id: newUser.id },
//     data: { refreshToken },
//   });

//   return {
//     user: {
//       id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//     },
//     accessToken,
//     refreshToken,
//   };
// };

// export const loginUser = async ({ email, password }) => {
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     throw ErrorResponse.notFound('User not found');
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw ErrorResponse.unauthorized('Invalid credentials');
//   }

//   const accessToken = generateAccessToken(user.id);
//   const refreshToken = generateRefreshToken(user.id);

//   // Store refresh token (optional for logout/invalidation later)
//   await prisma.user.update({
//     where: { id: user.id },
//     data: { refreshToken },
//   });

//   return {
//     user: {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//     },
//     accessToken,
//     refreshToken,
//   };
// };

// export const refreshAccessToken = async (refreshToken) => {
//   if (!refreshToken) throw ErrorResponse.badRequest('Refresh token is required');

//   try {
//     const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

//     const user = await prisma.user.findUnique({ where: { id: payload.userId } });
//     if (!user || user.refreshToken !== refreshToken) {
//       throw ErrorResponse.unauthorized('Invalid refresh token');
//     }

//     const newAccessToken = generateAccessToken(user.id);
//     const newRefreshToken = generateRefreshToken(user.id);

//     await prisma.user.update({
//       where: { id: user.id },
//       data: { refreshToken: newRefreshToken },
//     });

//     return {
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     };
//   } catch (err) {
//     throw ErrorResponse.unauthorized('Invalid or expired refresh token');
//   }
// };
