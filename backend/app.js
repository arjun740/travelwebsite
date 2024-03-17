const express = require('express');
const morgan = require('morgan');
const courseRouter = require('./routes/courseRoute');
const app = express();
const taskRouter = require('./routes/TaskRoute')
const cors = require('cors')
const globalErrorHandler = require('./controller/errorController')
const AppError = require('./util/AppError')

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use('/course',courseRouter)
app.use('/task',taskRouter)

app.all('*', (req, res, next) => {
    console.log(req.originalUrl);
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;