import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @Desc	CREATE NEW ORDER
// @route	POST /api/orders
// @access	PRIVATE
export const addOrderItems = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
		return;
	}
	else {
		const order = new Order({
			orderItems,
			user            : req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @Desc	GET ORDER BY ID
// @route	GET /api/orders/:id
// @access	PRIVATE
export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');
	console.log(order);
	if (order) {
		res.json(order);
	}
	else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @Desc	UPDATE ORDER TO PAID
// @route	POST /api/orders/:id/pay
// @access	PRIVATE
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id            : req.body.id,
			status        : req.body.status,
			update_time   : req.body.update_time,
			email_address : req.body.payer.email_address
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	}
	else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @Desc	UPDATE ORDER TO DELIVERED
// @route	POST /api/orders/:id/deliver
// @access	PRIVATE/ADMIN
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);
	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	}
	else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @Desc	GET LOGGED IN USER'S ORDERS
// @route	GET /api/orders/myorders
// @access	PRIVATE
export const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

// @Desc	GET ALL ORDERS
// @route	GET /api/orders
// @access	PRIVATE/ADMIN
export const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');
	res.json(orders);
});
