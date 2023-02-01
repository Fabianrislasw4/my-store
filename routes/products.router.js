const express = require('express')
const ProductsService = require('../services/product.service');
const productsRouters = express.Router();

const service = new ProductsService();

productsRouters.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

productsRouters.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

productsRouters.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
});

// Insert info
productsRouters.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
})
// Update partial info
productsRouters.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body)
        res.json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});
// delete  info
productsRouters.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = await service.delete(id);
    res.json(product);
});

module.exports = productsRouters;