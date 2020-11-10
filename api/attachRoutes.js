'use strict' 
const { getAllProduct } = require('./controllers/productController')
const { addNewShopping, getAllPurchases } = require('./controllers/purchaseController')

function attachRoutes(app) {
  app.get('/')
  app.get('/product/getallproducts', getAllProduct)
  app.get('/purchases/getallpurchases', getAllPurchases) 
  app.post('/purchases/addshopping', addNewShopping)
  return app
}

exports.attachRoutes = attachRoutes