const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const productController = require('../controllers/products');

router.get('/', productController.get_all_product);

router.post('/', checkAuth, productController.create_product);

router.get('/:productId', productController.get_product);

router.patch('/:productId', checkAuth, productController.update_product);

router.delete('/:productId', checkAuth, productController.delete_product);

module.exports = router;