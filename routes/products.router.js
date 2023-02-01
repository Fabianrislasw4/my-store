const express = require('express')
const ProductsService = require('../services/product.service');
const productsRouters = express.Router();

const service = new ProductsService();

productsRouters.get('/', (req, res) => {
    const products = service.find();
    res.json(products);
});

productsRouters.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

productsRouters.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);
    res.json(product);
});

// Insert info
productsRouters.post('/', (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json(newProduct);
})
// Update partial info
productsRouters.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body)
    res.json(product);
});
// delete  info
productsRouters.delete('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.delete(id);
    res.json(product);
});

module.exports = productsRouters;