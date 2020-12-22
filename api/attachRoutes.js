'use strict' 
const { getAllProduct, deleteAllProducts, getProductsNames, getCheapest, getTrademarks } = require('./controllers/productController')
const { addNewShopping, getAllPurchases , deleteAll, seeSpending, getFavShop} = require('./controllers/purchaseController')
const { addList, getList, updateList } = require('./controllers/listController')
const { passwordCheck, lockedCheck } = require('./controllers/loginController')

function attachRoutes(app) {
  app.get('/')
  app.get('/product/getallproducts', getAllProduct)
  app.get('/purchases/getallpurchases', getAllPurchases)
  app.get('/purchases/spent', seeSpending)
  app.get('/product/getallnames', getProductsNames)
  app.get('/list/getlist', getList)
  app.get('/login/lock', lockedCheck)
  app.post('/login/pwcheck', passwordCheck)
  app.post('/list/update', updateList)
  app.post('/list/addlist', addList)
  app.post('/product/gettrademarks', getTrademarks)
  app.post('/product/cheap', getCheapest)
  app.post('/purchases/favshop', getFavShop)
  app.post('/purchases/addshopping', addNewShopping)
  app.post('/product/erase', deleteAllProducts)
  app.post('/purchases/delete', deleteAll)
  return app
}

exports.attachRoutes = attachRoutes