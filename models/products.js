'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const products = new Schema({
  productName:{
    type: String,
    required: [true, 'Missing product name']
  },
  purchaseLocation:{
    type: String,
    required: [true, 'missing purchase location.']
  },
  producer:{
    type: String,
  },
  packaging: {
    type: Number,
  },
  price: {
    type: Number,
    required: [true, 'Missing price'],
  },
  shoppedTimes:{
    type: Number,
  },
})

const Products = mongoose.model('Products', products)
module.exports = Products