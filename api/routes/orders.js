const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order')

router.get('/', (req, res, next) => {
    Order
    .find()
    .select('product quantity')
    .exec()
    .then( result => {
        res.status(200).json(result);
    })
    .catch( err => {
        res.status(404).json({
            error: err
        });    
    });
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
    .then( product => {
        if (!product) {
            return res.status(404).json({
                error:err,
                message: "not found"
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            productId: req.body.productId
        });
        return order.save();
    })
    .then( result => {
        res.status(201).json(result);
    })
    .catch( err => {
        res.status(500).json({
            error: err,
        });
    });
    
});

router.get('/:orderId', (req, res, next) => {
    id = req.params.orderId
    Order.findById(id)
    .select('product quantity')
    .then( result => {
        if (!result){
            return res.status(404).json({
                message: "order not found"
            });
        }
        res.status(200).json(result);
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({
        _id: req.params.ordertId
    })
    .exec()
    .then( result => {
        res.status(200).json(
            {
                message: "deleted"
            }
        )
    })
    .catch( err => {
        
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;