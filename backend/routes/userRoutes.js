import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile } from  '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc auth user and get token
// @route POST /api/users/login
// @access Public
router.post('/login', authUser)

// @desc get user profile
// @route GET /api/users/profile
// @access Private

router.route('/profile').get(protect, getUserProfile)

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
router.route('/profile').put(protect, updateUserProfile)

// @desc register new user
// @route POST /api/users
// @access Public
router.post('/', registerUser)


export default router