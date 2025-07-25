const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/search', productController.searchProducts);
router.get('/low-stock', productController.getLowStockProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;