const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Order were fetched"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "orders were createded"
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