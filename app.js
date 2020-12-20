const express = require('express');

//executes express as a function / starts express
const app = express();

const productRoutes = require('./api/routes/products');

//mostly used to set up middleware for the application.
//req, res and next are the middleware layers, an incoming req
//has to go through .use and what we pass to it
app.use((req, res, next) => {
    res.status(200).json({
        message: 'it works!'
    });
});

module.exports = app;