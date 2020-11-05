'use strict'


const {db} = require('../server/db')

/**
 * @typedef PurchaseFunctions
 */

class PurchaseFunctions{
  //async addNewShopping(product_id, location, price, unitSize, quantity, unitType){
  async addNewShopping(product_id, data, date){
    try{
      const queryStringAddPurchase = `INSERT INTO purchases (product_id, location, price, unit_size, unit_type, purchases, date) values(${product_id}, '${data.location}', ${data.price}, ${data.unitSize}, '${data.unitType}', ${data.quantity},  ${date.body})`
      await db().query(queryStringAddPurchase)
    }
    catch(err){
      return new Error(err)
    }
    finally{
      db().close()
    }
  }

  formatDate() {
    var d = new Date.now(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  // async createTable(){
  //   const queryString = "CREATE TABLE IF NOT EXISTS purchases(product_id INT NOT NULL, location VARCHAR(255), price INT NOT NULL, unit_size INT NOT NULL, unit_type VARCHAR(255), quantity INT NOT NULL, date DATE) ENGINE=INNODB"
  //   try{
  //     await db().query(queryString)
  //   }
  //   catch(err){
  //     return new Error(err)
  //   }
  //   finally{
  //     db().close()
  //   }
  // }
}

// var t = new PurchaseFunctions()
// t.addNewShopping()

exports.PurchaseFunctions = PurchaseFunctions