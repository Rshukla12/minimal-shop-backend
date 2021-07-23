const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order')

router.get('/', (req, res, next) => {
    // Order.find()
    // .exec()
    // .then()
    // .catch();
    res.status(200).json({
        message: "Order were fetched"
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    res.status(201).json({
        message: "orders were createded",
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Order details",
        id: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({
        message: "order was deleted",
        id: req.params.orderId
    });
});

module.exports = router;