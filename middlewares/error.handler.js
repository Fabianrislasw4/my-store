function LogErrors ( err, req, res, next ){
    console.log('LogErrors');
    console.error(err);
    next(err);
}

// Para que se detecte que el middleware es de tipo error 
// debe de tener los 4 parametros.
function ErrorHandler(err, req, res, next){
    console.log('ErrorHandler')
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}


function boomErrorHandler(err, req, res, next){
    if(err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}


module.exports = {
    LogErrors,
    ErrorHandler,
    boomErrorHandler
}