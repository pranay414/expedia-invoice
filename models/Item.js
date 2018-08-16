const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: String,
    type: String,
    price: Number
});

module.exports = mongoose.model('invoice', ItemSchema, 'items');