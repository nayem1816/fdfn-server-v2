const ProductModel = require('../models/ProductModel');

exports.createProduct = (req, res) => {
    let reqBody = req.body;

    const url = req.get('host');
    const image = url + '/images/' + req.file.filename;
    const productData = { ...reqBody, image };

    ProductModel.create(productData, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.readProducts = (req, res) => {
    ProductModel.find({}, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.updateProduct = (req, res) => {
    let id = req.body['id'];
    let reqBody = req.body;

    ProductModel.updateOne(
        { _id: id },
        { $set: reqBody },
        { upsert: true },
        (err, data) => {
            if (err) {
                res.status(400).json({ status: 'fail', data: err });
            } else {
                res.status(200).json({ status: 'success', data: data });
            }
        }
    );
};

exports.deleteProduct = (req, res) => {
    let id = req.body['id'];

    ProductModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};

exports.readProductId = (req, res) => {
    let id = req.params.id;

    ProductModel.findById(id, (err, data) => {
        if (err) {
            res.status(400).json({ status: 'fail', data: err });
        } else {
            res.status(200).json({ status: 'success', data: data });
        }
    });
};