function LogErrors ( err, req, res, next ){
    console.log('LogErrors');
    console.error(err);
    next();
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

module.exports = {
    LogErrors,
    ErrorHandler
}