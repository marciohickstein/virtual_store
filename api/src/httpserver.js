const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const categoryRouter = require('./routes/categoryRouter');
const manufacturerRouter = require('./routes/manufacturerRouter');
const productRouter = require('./routes/productRouter');
const productCategoryRouter = require('./routes/productCategoryRouter');
const imageRouter = require('./routes/imageRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/category', categoryRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/product', productRouter);
app.use('/product_category', productCategoryRouter);
app.use('/image', imageRouter);

app.get('/', (req, res) => {
    return res.json({
        message: 'show de bola!'
    })
})

module.exports = app;