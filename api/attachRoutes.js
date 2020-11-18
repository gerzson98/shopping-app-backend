'use strict' 
const { getAllProduct, deleteAllProducts} = require('./controllers/productController')
const { addNewShopping, getAllPurchases , deleteAll} = require('./controllers/purchaseController')

function attachRoutes(app) {
  app.get('/')
  app.get('/product/getallproducts', getAllProduct)
  app.get('/purchases/getallpurchases', getAllPurchases) 
  app.post('/purchases/addshopping', addNewShopping)
  app.post('/product/erase', deleteAllProducts)
  app.post('/purchases/delete', deleteAll)
  return app
}

exports.attachRoutes = attachRoutes