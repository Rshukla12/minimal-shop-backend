const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');


exports.get_all_orders = (req, res, next) => {
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
}

exports.create_order = (req, res, next) => {
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
}

exports.get_order = (req, res, next) => {
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
}

exports.delete_order = (req, res, next) => {
    Order.deleteOne({
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
}