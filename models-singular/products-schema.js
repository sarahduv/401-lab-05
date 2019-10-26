'use strict';

const mongoose = require('mongoose');

// What fields and constraints do we want?
const products = mongoose.Schema({
  _id: {type: String},
  name: { type: String, required: true },
  description: { type: String, required: false },
});

// Do we need to run any lifecycle hooks/middleware?

// 'products' is the table name
// products variable is the schema
module.exports = mongoose.model('products', products);
