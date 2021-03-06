const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_all_product = (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then( docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${doc._id}`
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch( err => {
        res.status(500).json({ error:err });
    });
}

exports.create_product = (req, res, next) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price 
    });

    product
    .save()
    .then( result => {
        res.status(201).json({ createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            request: {
                type: 'GET',
                url: `http://localhost:3000/products/${result._id}`
            }
        }});
    })
    .catch(err => {
        res.status(500).json({ error:err });
    });
}

exports.get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then( doc => {
        if ( doc ){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products'
                }
            });
        } else {
            res.status(404).json({ message: 'Not found' })
        }
    })
    .catch( err => {
        res.status(500).json({ error: err});
    });
}

exports.update_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true})
    .exec()
    .then( result => { 
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }    
        }); 
    })
    .catch ( err => { 
        res.status(500).json({ error: err }); 
    });
}

exports.delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then( result => { 
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        }); 
    })
    .catch( err => { 
        res.status(500).json({ error: err });
    });        
}