const mongoose = require('mongoose');

const Shema = mongoose.Schema

const ProductSchema = new Shema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;