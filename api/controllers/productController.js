'use strict'

const asyncHelper = require('../middleware/async')
const { ProductFunctions } = require('../../functions/ProductFunctions')

exports.getAllProduct = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  const result = await productFunctions.getAllProduct()
  response.status(200).json(result)
})

exports.getProductID = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  const result = await productFunctions.getProductID(request.body)
  response.status(200).json(result)
})

exports.getCheapest = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  const result = await productFunctions.getCheapest(request.body.msg)
  response.status(200).json(result)
})

exports.getProductsNames = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  const result = await productFunctions.getProductsNames()
  response.status(200).json(result)
})

exports.deleteAllProducts = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  await productFunctions.deleteAll()
  response.status(200).json({})
})

exports.getTrademarks = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  const result = await productFunctions.getTrademarks(request.body.msg)
  response.status(200).json(result)
})


