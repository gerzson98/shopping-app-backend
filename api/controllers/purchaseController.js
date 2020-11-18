'use strict'

const asyncHelper = require('../middleware/async')
const { PurchaseFunctions } = require('../../functions/PurchaseFunctions')
const { ProductFunctions } = require('../../functions/ProductFunctions')
const { ConvertFunctions } = require('../../functions/Convert')

exports.addNewShopping = asyncHelper((request, response) => {
  const purchaseFunctions = new PurchaseFunctions()
  const productFunctions = new ProductFunctions()
  const convert = new ConvertFunctions()
  const date = new Date(Date.now()).toLocaleDateString()
  const data = request.body
  if (Array.isArray(data)) {
    data.forEach(async function (element) {
      const result = await productFunctions.upLoadProduct(element.name, element.trademark, element.quantity)
      const product_id = convert.resultToObject(result)[0].product_id
      await purchaseFunctions.addNewShopping(product_id, element.location, element.price, element.unitType, element.unitSize, element.quantity, date)
    })
  }
  response.status(200)
})

exports.getAllPurchases = asyncHelper(async (request, response) => {
  const purchaseFunctions = new PurchaseFunctions()
  const result = await purchaseFunctions.getAllPurchases()
  response.status(200).json(result)
})

exports.deleteAll = asyncHelper(async (request, response) => {
  const purchaseFunctions = new PurchaseFunctions()
  await purchaseFunctions.deleteAll()
  response.status(200)
})



