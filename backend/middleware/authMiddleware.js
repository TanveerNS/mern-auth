import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { ObjectId } from 'mongodb'; 
import { getUserCollection } from '../config/db.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token:', token);  

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);  

      const user = await getUserCollection().findOne({ _id: new ObjectId(decoded.userId) });

      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      const { password, ...userData } = user;

      req.user = userData; 
      next();
    } catch (error) {
      console.error('Error:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
