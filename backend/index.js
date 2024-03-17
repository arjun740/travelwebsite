// ----------------------------------------------------------------------------------------------------------

// USE PRODUCTION MODE FOR USER FRIENDLY ERROR MESSAGE
// USE DEVELOPMENT MODE FOR DEV FRIENDLY ERROR MESSAGE

// ----------------------------------------------------------------------------------------------------------
const dotenv = require('dotenv')
const mongoose = require('mongoose')


const app =  require('./app');
const morgan = require("morgan");
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({path:"./config.env"})

const port = process.env.PORT || 3030;
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


mongoose.connect('mongodb://localhost:27017/student_tasks', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("the database connected")
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});
const server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('unhandled rejection  shutting down...');
    server.close(() => {
        process.exit(1);
    });
});