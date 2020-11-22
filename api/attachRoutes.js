'use strict' 
const { getAllProduct, deleteAllProducts} = require('./controllers/productController')
const { addNewShopping, getAllPurchases , deleteAll, seeSpending, getFavShop} = require('./controllers/purchaseController')

function attachRoutes(app) {
  app.get('/')
  app.get('/product/getallproducts', getAllProduct)
  app.get('/purchases/getallpurchases', getAllPurchases)
  app.get('/purchases/spent', seeSpending)
  app.get('/purchase/favshop', getFavShop)
  app.post('/purchases/addshopping', addNewShopping)
  app.post('/product/erase', deleteAllProducts)
  app.post('/purchases/delete', deleteAll)
  return app
}

exports.attachRoutes = attachRoutes