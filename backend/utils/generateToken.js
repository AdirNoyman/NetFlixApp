import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '15d' });

  // 15 days in ms. the cookie is available only through http requests (thus prevent XSS atacks. and CSRF safe)
  res.cookie('jwt-netflix', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    // Makes sure that the cookie is sent only over HTTPS and not over HTTP
    secure: ENV_VARS.NODE_ENV !== 'development',
  });

  return token;
};
