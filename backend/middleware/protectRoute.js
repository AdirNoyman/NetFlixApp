import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies['jwt-netflix'];

    if (!token) {
      console.log('No token');
      return res
        .status(401)
        .json({ success: false, message: 'Sorry, you are not authorized 🤨' });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      console.log('Invalid cookie');
      return res
        .status(401)
        .json({ success: false, message: 'Sorry, you are not authorized 🤨' });
    }

    // Get the user from the database and attach it to the request object, but exclude the password
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log('Invalid user');
      return res
        .status(401)
        .json({ success: false, message: 'Sorry, you are not authorized 🤨' });
    }

    // Save the user to request object
    req.user = user;

    next();
  } catch (error) {
    console.log('Error in protectRoute Middleware => ', error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error 🤨' });
  }
};
