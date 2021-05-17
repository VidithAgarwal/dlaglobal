import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateJsonwebtoken.js';

// @Desc	AUTH USER AND GET TOKEN
// @route	POST /api/users/login
// @access	PUBLIC
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			isAdmin : user.isAdmin,
			token   : generateToken(user._id)
		});
	}
	else {
		res.status(401);
		throw new Error('Invalid Email Or Password');
	}
});

// @Desc	REGISTER USER
// @route	POST /api/users
// @access	PUBLIC
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User Already Exists');
	}

	const user = await User.create({
		name,
		email,
		password
	});

	if (user) {
		res.status(201).json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			isAdmin : user.isAdmin,
			token   : generateToken(user._id)
		});
	}
	else {
		res.status(400);
		throw new Error('Invalid User Data');
	}
});

// @Desc	GET USER PROFILE
// @route	POST /api/users/profile
// @access	PRIVATE
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id     : user._id,
			name    : user.name,
			email   : user.email,
			isAdmin : user.isAdmin,
			token   : generateToken(user._id)
		});
	}
	else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @Desc	UPDATE USER PROFILE
// @route	PUT /api/users/profile
// @access	PRIVATE
export const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();
		res.json({
			_id     : updatedUser._id,
			name    : updatedUser.name,
			email   : updatedUser.email,
			isAdmin : updatedUser.isAdmin,
			token   : generateToken(updatedUser._id)
		});
	}
	else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @Desc	GET ALL USERS
// @route	GET /api/users
// @access	PRIVATE/ ADMIN
export const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

// @Desc	DELETE A USER
// @route	DELETE /api/users/:id
// @access	PRIVATE/ ADMIN
export const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await user.remove();
		res.json({ message: 'User removed' });
	}
	else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @Desc	GET USERS BY ID
// @route	GET /api/users/:id
// @access	PRIVATE/ ADMIN
export const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (user) {
		res.json(user);
	}
	else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @Desc	UPDATE A USER
// @route	PUT /api/users/:id
// @access	PRIVATE/ ADMIN
export const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id     : updatedUser._id,
			name    : updatedUser.name,
			email   : updatedUser.email,
			isAdmin : updatedUser.isAdmin
		});
	}
	else {
		res.status(404);
		throw new Error('User Not Found');
	}
});
