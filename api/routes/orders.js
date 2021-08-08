const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/orders');

router.get('/', checkAuth, orderController.get_all_orders);

router.post('/', checkAuth, orderController.create_order);

router.get('/:orderId', checkAuth, orderController.get_order);

router.delete('/:orderId', checkAuth, orderController.delete_order);

module.exports = router;