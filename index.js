const express = require('express')
const app = express()
const faker = require('faker');

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Server online !!')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl(),
    })
  }
  res.json(products);
});


app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId , productId } = req.params;
  res.json({
    categoryId,
    productId
  })
});
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
});

app.get('/products/:id', (req, res) =>{
  const { id } = req.params;
  res.json({id});
});


app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else {
    res.send('No hay parametros');
  }


});

app.listen(PORT, () => {
  console.log(`My store run in port ${PORT}`);
})
