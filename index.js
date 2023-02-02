const express = require('express')
const cors = require('cors');
const app = express()
const routerApi = require('./routes')
const { LogErrors, ErrorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Server online !!')
});

//Middleware
app.use(express.json());


// Esta definicion sirve para asignar un whitelist de los origenes que permite acceder la api...
// Por eso en la funcion se le envian las opciones 
// app.use(cors(options)); == Esto es con whitelist
// app.use(cors()); == Esto permite a todos entrar...
const whitelist = ['http://localhost:8080'];
const options = {
  origin: ( origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true);
    }else {
      callback(new Error('access denied'));
    }
  }
}


//app.use(cors(options)); // Esto es para habilitar cualquier origen que se quiera conectar...
app.use(cors());

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
