const express = require('express');
const productsRouters = require('./products.router');
const usersRouters = require('./users.router');
const categoriesRouters = require('./categories.router');

function routerApi(app) {
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/products', productsRouters);
    router.use('/categories', categoriesRouters)
    router.use('/users', usersRouters);
}

module.exports = routerApi;