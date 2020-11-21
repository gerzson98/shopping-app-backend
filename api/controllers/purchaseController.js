'use strict'

const asyncHelper = require('../middleware/async')
const { PurchaseFunctions } = require('../../functions/PurchaseFunctions')
const { ProductFunctions } = require('../../functions/ProductFunctions')
const { ConvertFunctions } = require('../../functions/Convert')

exports.addNewShopping = asyncHelper(async (request, response) => {
  const purchaseFunctions = new PurchaseFunctions()
  const productFunctions = new ProductFunctions()
  const convert = new ConvertFunctions()
  const date = convert.getDateNow()
  const data = request.body
  try {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; ++i){ 
        let element = data[i];
        const result = await productFunctions.upLoadProduct(element.name, element.trademark, element.quantity)
        const product_id = convert.resultToObject(result)[0].product_id
        await purchaseFunctions.addNewShopping(product_id, element.location, element.price, element.unitType, element.unitSize, element.quantity, date)
      }
      response.status(200).json({})
    } else{
      response.status(401).json({})
    }
  } catch (err) {
    response.status(500).json({err})
  }
})

exports.seeSpending = asyncHelper(async (request, response) => {
  const purchaseFunctions = new PurchaseFunctions()
  const convert = new ConvertFunctions()
  const result = await purchaseFunctions.getAllPurchases()
  const purchases = convert.resultToObject(result)
  let sum = 0
  if (Array.isArray(purchases)) {
    purchases.forEach(element => {
      sum += (element.price * element.quantity)
    })
  }
  response.status(200).json(sum)
})

exports.getAllPurchases = asyncHelper(async (request, response) => {
  const purchaseFunctions = new PurchaseFunctions()
  const convert = new ConvertFunctions()
  const result = await purchaseFunctions.getAllPurchases()
  const data = convert.simplyfyDates(result)
  response.status(200).json(data)
})

exports.deleteAll = asyncHelper(async (request, response) => {
  const purchaseFunctions = new PurchaseFunctions()
  await purchaseFunctions.deleteAll()
  response.status(200).json({})
})



