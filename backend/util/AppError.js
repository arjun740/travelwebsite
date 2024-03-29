class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message; // Updated property name to "message"
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;