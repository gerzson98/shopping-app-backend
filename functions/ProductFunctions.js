'use strict'


const {db} = require('../server/db')

/**
 * @typedef ProductFunctions
 */
class ProductFunctions{
  async getAllProduct(){
    const queryString = 'SELECT * FROM products'
    try{
      const result = await db().query(queryString)
      return result
    }
    catch(err){
      return new Error(err)
    }
    finally{
      db().close()
    }
  }

  async incrementPurchases(name, trademark, purchases){
    const queryString = `UPDATE products SET purchases = purchases + ${purchases} WHERE name = '${name}' AND trademark = '${trademark}';`
    const queryStringGetID = `SELECT product_id FROM products WHERE name = '${name}', trademark = '${trademark}'`
    try{
      await db().query(queryString)
      return db().query(queryStringGetID)
    }
    catch(err){
      return new Error(err)
    }
    finally{
      db().close()
    }
  }

  async addProduct(name, trademark, purchases){
    const queryStringInsert = `INSERT INTO products (name, trademark, purchases) values('${name}', '${trademark}', ${purchases})`
    const queryStringGetID = `SELECT product_id FROM products WHERE name = '${name}', trademark = '${trademark}'`
    try{
      await db().query(queryStringInsert)
      return await db().query(queryStringGetID)
    }
    catch(err){
      return new Error(err)
    }
    finally{
      db().close()
    }
  }
  
  async upLoadProduct(data){
    if(!data.quantity){
      data.quantity = 1
    }
    try{
      const result = await this.getProductID(data.name, data.trademark)
      if(!result){
        return await this.addProduct(data.name, data.trademark, data.quantity)
      }
      else{
        return await this.incrementPurchases(data.name, data.trademark, data.quantity)
      }
    }
    catch(err) {
      return new Error(err)
    }
    finally{
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

  async getProductID(name, trademark){
    const queryString = `SELECT product_id FROM products WHERE name = '${name}' AND trademark = '${trademark}'`
    try{
      return await db().query(queryString)
    }
    catch(err){
      return new Error(err)
    }
    finally{
      db().close()
    }
  }
}


// const t = new ProductFunctions()
// t.upLoadProduct("Snickers", "Snickers", 1)
// t.getAllProduct()

exports.ProductFunctions = ProductFunctions