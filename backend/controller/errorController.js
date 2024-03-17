const  AppError = require('./../util/AppError')
const handleCastErrorDB = err => {
    const message = `inValid ${err.path}: ${err.value}`;
    return new AppError(message, 404);
};
const handleDuplicateFieldsDB = err => {
    const pattern = /(["'])(\\?.)*?\1/;
    const value = err.errmsg.match(pattern)[0];
    const message = `Duplicate fields value:${value} please use another value`;
    return new AppError(message, 400);
};
const handleValidationDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = Object.create(err);
        //---------------------------------important---------------------------------------
        // let error = { ...err };
        //  it will not work beacause it make shallow copy only .
        //  message will be in prototype to access that we can use
        // let error = Object.create(err);
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 11000) error = handleDuplicateFieldsDB(error);
        if (err.name === 'ValidationError') error = handleValidationDB(error);
        sendErrorProd(error, res);
    }
};