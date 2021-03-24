import express from 'express'
import { getProductById, getProducts, deleteProduct, updateProduct, createProduct, createProductReview } from  '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

router.post('/:id/reviews', protect, createProductReview)

export default router