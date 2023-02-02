const express = require('express')
const ProductsService = require('../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema')


const productsRouters = express.Router();
const service = new ProductsService();

productsRouters.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

productsRouters.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

productsRouters.get('/:id',
    // Se le envia al middleware el schema de datos y de donde va obtener la informacion 
    validatorHandler(getProductSchema, 'params') // Se agrega el middleware de validacion, para antes de hacer el get se valide el dato..
    ,async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// Insert info
productsRouters.post('/', 
    validatorHandler(createProductSchema, 'body')
    , async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
})
// Update partial info
productsRouters.patch('/:id',
      validatorHandler(getProductSchema, 'params') //Puede haber mas de un middleware, que se encargen de hace distintas cosas.. Este valida el ID
    , validatorHandler(updateProductSchema, 'body') // Y este validara la info...
    , async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body)
        res.json(product);
    } catch (error) {
        next(error);
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