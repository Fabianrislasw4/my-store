const boom = require('@hapi/boom')
// Este es un middleware para validar los schemas. 
// 


//Este es un middleware dinamico... para las peticiones
// Se recibe un schema de joi
function validatorHandler(schema, property){
    return (req, res, next) => {
        const data = req[property];
        const {error} = schema.validate(data);
        if(error){
            next(boom.badRequest(error));
        }
        next();
    }
}


module.exports = validatorHandler;