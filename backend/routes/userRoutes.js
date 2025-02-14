import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; 
import { getUserProfile, authUser, registerUser,updateUserProfile,logoutUser } from '../controllers/userController.js'; 

const router = express.Router();

router.route('/').post(registerUser);
router.route('/auth').post(authUser); 
router.route('/profile').get(protect, getUserProfile); 
router.route('/profile').put(protect, updateUserProfile);
router.route('/logout').post(logoutUser); 

export default router;
