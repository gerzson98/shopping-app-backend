'use strict';


const {db} = require('../server/db');

/**
 * @typedef PurchaseFunctions
 */

class PurchaseFunctions {

  async addNewShopping(product_id, location, price, unitType, unitSize, quantity, date){
    const queryStringAddPurchase = `INSERT INTO purchases (product_id, location, price, unit_size, unit_type, quantity, date) VALUES('${product_id}', '${location}', '${price}', '${unitSize}', '${unitType}', '${quantity}',  '${date}');`
    try {
      await db().query(queryStringAddPurchase)
    }
    catch (err) {
      console.log(new Error(err))
      return new Error(err)
    }
    finally {
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
    const queryString = 'SELECT * FROM shopping_app.purchases;'
    try {
      const result = await db().query(queryString)
      return result
    }
    catch (err) {
      console.log(new Error(err))
      return new Error(err) 
    }
    finally {
      db().close()
    }
  }

  async deleteAll() {
    const queryString = 'TRUNCATE TABLE shopping_app.purchases;'
    try {
      await db().query(queryString)
    }
    catch (err) {
      console.log(new Error(err))
      return new Error(err)
    }
    finally {
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