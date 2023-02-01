const express = require('express')
const faker = require('faker')

const categoriesRouters = express.Router();


categoriesRouters.get('/categories/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId
    })
});

module.exports = categoriesRouters;