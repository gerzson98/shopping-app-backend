'use strict'

const asyncHelper = require('../middleware/async')
const { PurchaseFunctions } = require('../../functions/PurchaseFunctions')
const { ProductFunctions } = require('../../functions/ProductFunctions')

// Kéne ide egy olyan importot megoldani a product controllerböl, hogy csak a relevansakat töltse be.
exports.addNewShopping = asyncHelper(async (request, response) =>{
  const purchaseFunctions = new PurchaseFunctions()
  const productFunctions = new ProductFunctions()
  const date = new Date(Date.now()).toISOString()
  request.foreach(element => {
    const product_id = await productFunctions.upLoadProduct(element.body.name, element.body.trademark, element.body.purchases)
    await purchaseFunctions.addNewShopping(product_id, element, date)
  });
  response.status(200)
})


