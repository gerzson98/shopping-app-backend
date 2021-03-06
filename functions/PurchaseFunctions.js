'use strict';


const { db } = require('../server/db');
const { QueryFunctions } = require('./Querys');
const { UtilFunctions } = require('./Utils');

/**
 * @typedef PurchaseFunctions
 */

class PurchaseFunctions {

  async addNewShopping(product_id, location, price, unitType, unitSize, quantity){
    const queryStringAddPurchase = `INSERT INTO purchases (product_id, location, price, unit_size, unit_type, quantity, date) VALUES('${product_id}', '${location}', '${price}', '${unitSize}', '${unitType}', '${quantity}', CURDATE());`
    
    try {
      await db().query(queryStringAddPurchase)
    } catch (err) {
      console.log(new Error(err))
      return new Error(err)
    } finally {
      db().close()
    }
  }

  // async getPurchasesByDate (from) {
  //   const queryString = `SELECT * FROM purchases WHERE date > '${from}';`
  //   try {
  //     const result = await db().query(queryString)
  //     return result
  //   }
  //   catch (err) {
  //     return new Error(err)
  //   } finally {
  //     db().close()
  //   }
  // }

  async getAllPurchases () {
    const querys = new QueryFunctions()
    const queryString = querys.getByPrefs('purchases')

    try {
      const result = await db().query(queryString)
      return result
    }  catch (err) {
      console.log(new Error(err))
      return new Error(err) 
    } finally {
      db().close()
    }
  }

  async getFavShopData (by) {
    const querys = new QueryFunctions()

    let queryString = '';

    if (by == 'Money') {
      queryString = querys.getByPrefs('purchases', ['location', 'quantity', 'price'])
    } else if (by == 'Quantity') {
      queryString = querys.getByPrefs('purchases', ['location', 'quantity'])
    } else if (by == 'Types') {
      queryString = querys.getByPrefs('purchases', ['location', 'product_id'])
    }
    if (queryString !== '') {
      try {
        const result = await db().query(queryString)
        return result
      } catch (err) {
        console.log(new Error(err))
        return new Error(err) 
      } finally {
        db().close()
      }
    } else {
      let err = 'Request didnt reach function level.'
      return err
    } 
  }
  
  calculateFavShop (data) {
    const utils = new UtilFunctions()

    let shops = []
    let points = []

    if (!data[0].price) {
      data.forEach(purchase => {
        if (shops.includes(purchase.location)) {
          let index = shops.indexOf(purchase.location)
          points[index] += purchase.quantity
        } else {
          shops.push(purchase.location)
          points.push(purchase.quantity)
        }
      })
    } else {
      data.forEach(purchase => {
        if (shops.includes(purchase.location)) {
          let index = shops.indexOf(purchase.location)
          points[index] += purchase.quantity * purchase.price
        } else {
          shops.push(purchase.location)
          points.push(purchase.quantity * purchase.price)
        }
      })
    }
    return utils.pickBest(shops, points)
  }

  async deleteAll() {
    const queryString = 'TRUNCATE TABLE shopping_app.purchases;'
    try {
      await db().query(queryString)
    } catch (err) {
      console.log(new Error(err))
      return new Error(err)
    } finally {
      db().close()
    }
  }


  // async createTable(){
  //   const queryString = "CREATE TABLE IF NOT EXISTS purchases(product_id INT NOT NULL, location VARCHAR(255), price INT NOT NULL, unit_size INT NOT NULL, unit_type VARCHAR(255), quantity INT NOT NULL, date DATE) ENGINE=INNODB"
  //   try{
  //     await db().query(queryString)
  //   }
  //   catch(err){
  //     return new Error(err)
  //   } finally{
  //     db().close()
  //   }
  // }
}

// var t = new PurchaseFunctions()
// t.addNewShopping()

exports.PurchaseFunctions = PurchaseFunctions