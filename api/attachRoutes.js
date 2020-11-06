'use strict' 
const { getAllProduct, upLoadProduct } = require('./controllers/productController')
const { addNewShopping } = require('./controllers/purchaseController')

function attachRoutes(app) {
  app.get('/')
  app.get('/product/getall', getAllProduct)
  app.post('/product/addproduct', upLoadProduct)
  app.post('/purchases/addshopping', addNewShopping)
  return app
}

exports.attachRoutes = attachRoutes