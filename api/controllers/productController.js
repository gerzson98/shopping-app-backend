'use strict'

const asyncHelper = require('../middleware/async')
const { ProductFunctions } = require('../../functions/ProductFunctions')
//const { response } = require('express')

exports.getAllProduct = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  const result = await productFunctions.getAllProduct()
  response.status(200).json(result)
})

exports.upLoadProduct = asyncHelper(async (request, response) => {
  const productFunctions = new ProductFunctions()
  await productFunctions.upLoadProduct(request.body)
  response.status(200)
})

// exports.getProductID = asyncHelper(async (request, response) => {
//   const productFunctions = new ProductFunctions()
//   const result = await productFunctions.getProductID(request.body)
//   response.status(200).json(result)
// })
