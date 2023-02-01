const express = require('express')
const app = express()
const routerApi = require('./routes')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Server online !!')
});

//Middleware
app.use(express.json());

// Aquí se configuran las rutas de los endpoints 
routerApi(app);

app.listen(PORT, () => {
  console.log(`My store run in port ${PORT}`);
})
