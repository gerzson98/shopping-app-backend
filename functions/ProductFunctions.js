'use strict'


const { db } = require('../server/db')
const { QueryFunctions } = require('./querys')


/**
 * @typedef ProductFunctions
 */
class ProductFunctions {
  
  async getProductID(name, trademark) {
    const querys = new QueryFunctions()
    const conditions = [
      {
        column: 'name',
        value: `'${name}'`
      },
      {
        column: 'trademark',
        value: `'${trademark}'`
      }
    ]
    const queryString = querys.getByPrefs('products', ['product_id'], conditions)
    try {
      const result = await db().query(queryString)
      return result
    }
    catch (err) {
      return err
    } finally {
      db().close()
    }
  }

  async deleteAll() {
    const queryString = 'TRUNCATE TABLE shopping_app.products;'
    try {
      await db().query(queryString)
    }
    catch (err) {
      return err
    } finally {
      db().close()
    }
  }

  async getAllProduct() {
    const querys = new QueryFunctions()
    const queryString = querys.getByPrefs('products')
    try {
      const result = await db().query(queryString)
      return result
    }
    catch (err) {
      return err
    } finally {
      db().close()
    }
  }

  async incrementPurchases(name, trademark, purchases) {
    const queryString = `UPDATE products SET purchases = purchases + ${purchases} WHERE name = '${name}' AND trademark = '${trademark}';`
    try {
      await db().query(queryString)
    }
    catch (err) {
      return err
    } finally {
      db().close()
    }
  }

  async addProduct(name, trademark, purchases) {
    const queryStringInsert = `INSERT INTO products (name, trademark, purchases) VALUES('${name}', '${trademark}', '${purchases}');`
    try {
      await db().query(queryStringInsert)
    }
    catch (err) {
      return err
    } finally {
      db().close()
    }
  }

  async upLoadProduct(name, trademark, quantity) {
    if (!quantity) {
      quantity = 1
    }
    try {
      const result = await this.getProductID(name, trademark)
      const length = JSON.parse(JSON.stringify(result)).length
      if (length === 0) {
        await this.addProduct(name, trademark, quantity)
      } else {
        await this.incrementPurchases(name, trademark, quantity)
      }
      return await this.getProductID(name, trademark)
    }
    catch (err) {
      return err
    } finally {
      db().close()
    }
  }

  // async getProductByName(name){
  //   if(!(name === null) && name != undefined){
  //     const queryString = `SELECT * FROM products WHERE name = '${name}'`
  //     try{
  //       return await db().query(queryString)
  //     }
  //     catch(err){
  //       return new Error(err)
  //     }
  //     finally{
  //       db().close()
  //     }
  //   }
  // }

}


//const t = new ProductFunctions()
// t.upLoadProduct("Snickers", "Snickers", 1)
//t.getProductID('kecske', 'Beka', 2)

exports.ProductFunctions = ProductFunctions