import express from 'express';
import {
	createProduct,
	createProductReview,
	deleteProduct,
	getProductById,
	getProducts,
	getTopProducts,
	updateProduct
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id').put(protect, admin, updateProduct);
router.route('/').post(protect, admin, createProduct);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
