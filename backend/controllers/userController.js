import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc auth user and get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('invalid email or password')
	}
})

// @desc get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		const { name, email, password } = req.body
		user.name = name || user.name
		user.email = email || user.email

		if (password) {
			user.password = password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

// @desc register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	} else {
		const user = await User.create({
			name,
			email,
			password,
		})

		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			})
		} else {
			res.status(400)
			throw new Error('invalid user data')
		}
	}
})

// @desc get all users
// @route GET /api/users
// @access Private/admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})

	res.json(users)
})

// @desc delete a user
// @route DELETE /api/users/:id
// @access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		await user.remove()
		res.json(`${user._id} removed`)
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

// @desc get a user by ID
// @route GET /api/users/:id
// @access Private/admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')

	if (user) {
		res.json(user)
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

// @desc update user profile by admin
// @route PUT /api/users/:id
// @access Private/admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		const { name, email, isAdmin } = req.body
		user.name = name || user.name
		user.email = email || user.email
		user.isAdmin = isAdmin

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
})

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }
