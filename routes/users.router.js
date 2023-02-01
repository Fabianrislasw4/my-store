const express = require('express')
const faker = require('faker')

const usersRouters = express.Router();

usersRouters.get('/', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) {
        res.json({
            limit,
            offset
        });
    } else {
        res.send('No hay parametros');
    }
});
module.exports = usersRouters;


