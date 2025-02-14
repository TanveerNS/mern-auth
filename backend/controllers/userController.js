import asyncHandler from 'express-async-handler';
import { hashPassword, matchPassword } from '../models/userModel.js'; 
import generateToken from '../utils/generateToken.js';
import { getUserCollection } from '../config/db.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('email', email, password)

  const userCollection = getUserCollection(); 
  const user = await userCollection.findOne({ email });

  if (!user) {
    console.log(`User with email ${email} not found.`);
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const isPasswordCorrect = await matchPassword(password, user.password);
  if (!isPasswordCorrect) {
    console.log(`Password does not match for user ${email}.`);
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token, 
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userCollection = getUserCollection(); 
  const userExists = await userCollection.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  const user = await userCollection.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user.insertedId);

    res.status(201).json({
      _id: user.insertedId,
      name,
      email,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


const getUserProfile = asyncHandler(async (req, res) => {
  const userCollection = getUserCollection(); 
  const user = await userCollection.findOne({ _id: req.user._id });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userCollection = getUserCollection(); 

  const user = await userCollection.findOne({ _id: req.user._id });

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await hashPassword(req.body.password);
    }

    const updatedUser = await userCollection.updateOne(
      { _id: req.user._id },
      { $set: { name: user.name, email: user.email, password: user.password } }
    );

    const token = generateToken(updatedUser.upsertedId || user._id);

    res.json({
      _id: updatedUser.upsertedId || user._id,
      name: user.name,
      email: user.email,
      token,  
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), 
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
};
