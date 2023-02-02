const express = require('express')
const app = express()
const routerApi = require('./routes')
const { LogErrors, ErrorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Server online !!')
});

//Middleware
app.use(express.json());
// Aquí se configuran las rutas de los endpoints 
routerApi(app);
// Se agregan los middlewares y siempre se definen despues de las rutas..
// Y llevan un orden y siempre al final debe ir el middler ware que ya no deje continuar...
app.use(LogErrors);
app.use(boomErrorHandler);
app.use(ErrorHandler);



app.listen(PORT, () => {
  console.log(`My store run in port ${PORT}`);
})
