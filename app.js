const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//InitDB
require('./initDB')();

app.all('/test', (req, res) => {
    //console.log(req.query);
    //res.send(req.query);
    //console.log(req.params);
    //res.send(req.params);
    console.log(req.body);
    res.send(req.body);
});

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

//erro 404
app.use((req, res, next) => {
    //const err = new Error("Not Found")
    //err.status = 404
   // next(err)
   next(createError(404, 'Not Found'));
});

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        erro: {
            status: err.status || 500,
            message: err.message
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ( ) => {
    console.log('Server started on port '+ PORT + '...');
});