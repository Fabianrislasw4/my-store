const Joi = require('joi');
const ProductsService = require('../services/product.service');


//Definicion del schema a usar para los objetos..
// Se usa la librería ded JOI
// https://joi.dev/
const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(20);
const price = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
});

const getProductSchema = Joi.object({
    id: id.required(),
});


module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
};