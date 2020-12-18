'use strict'

const { db } = require('../server/db')
const { UtilFunctions } = require('./Utils')
const { QueryFunctions } = require('./querys')
const { ConvertFunctions } = require('./Convert')

/**
 * @typedef ListFunctions
 */
class ListFunctions {
  async getList(){
    const queryString = 'SELECT * FROM list'
    try {
      return await db().query(queryString)
    } catch (error) {
      return error
    } finally {
      db().close()
    }
  }

  async addListElement (element) {
    const queryString = `INSERT INTO shopping_app.list (name, trademark, unit_type, quantity) VALUES('${element.name}', '${element.trademark}', '${element.unitType}', ${element.quantity})`
    try {
      return await db().query(queryString)
    } catch (error) {
      return error
    } finally {
      db().close()
    }
  }

  async incrementListElement(id, quantity) {
    const queryString = `UPDATE list SET quantity = quantity + ${quantity} WHERE id = ${id}`
    try {
      return await db().query(queryString)
    } catch (error) {
      return error
    } finally {
      db().close()
    }
  }

  async getListElementId (name, trademark, unitType) {
    const queryS = new QueryFunctions()
    const convert = new ConvertFunctions()
    const queryString = queryS.getByPrefs('list', ['id'], [{column: 'name', value: name}, {column: 'trademark', value: trademark}, {column: 'unit_type', value: unitType}])
    const result = await db().query(queryString)
    const idList = convert.resultToObject(result)
    if (idList[0] === undefined) {
      return 0
    }
    else {
      return idList[0].id
    }
  }

  async upLoadListElement (element) {
    const utilFunctions = new UtilFunctions()

    element.name = utilFunctions.stringSimplify(element.name)

    if (!element.trademark) element.trademark = 'not_given'
    else element.trademark = utilFunctions.stringSimplify(element.trademark)

    const def = utilFunctions.metricDefaulter(element.unitType, element.unitSize, element.quantity)
    element.unitType = def.unitType
    element.quantity = def.quantity

    const id = await this.getListElementId(element.name, element.trademark, element.unitType)
    
    if (id == 0) {
      try {
        return await this.addListElement(element)
      } catch (error) {
        return error
      } finally {
        db().close()
      }
    } else {
      try {
        return await this.incrementListElement(id, element.quantity)
      } catch (error) {
        return error
      } finally {
        db().close()
      }
    }
  }

  async listElDowngrader (billE) {
    const queryString = `UPDATE shopping_app.list SET quantity = quantity - ${billE.quantity} WHERE name = '${billE.name}' AND trademark = '${billE.trademark}' AND unit_type = '${billE.unitType}';`
    try {
      await db().query(queryString)
    } catch (error) {
      console.error(error)
      return error
    } finally {
      db().close()
    }
  }

  async listElDelete (billE) {
    const queryString = `DELETE FROM shopping_app.list WHERE name = '${billE.name}' AND trademark = '${billE.trademark}' AND unit_type = '${billE.unitType}';`
    try {
      await db().query(queryString)
    } catch (error) {
      console.error(error)
    } finally {
      db().close()
    }
  }

  async listChecker (bill) {
    // const utils = new UtilFunctions()
    const convert = new ConvertFunctions()
    let list = await this.getList()
    list = convert.resultToObject(list)
    if (list !== [] && list !== undefined) {
      if (!Array.isArray(bill)) bill = [bill]
      for (let billE of bill) {
        billE = convert.fromBEtoLE(billE)
        for (let listE of list) {
          if (this.elementComparer(billE, listE)) {
            if (billE.quantity > listE.quantity * 0.7) {
              await this.listElDelete(billE)
              listE = {}
            } else {
              await this.listElDowngrader(billE)
              listE.quantity -= billE.quantity
            }
          }
        }
      }
    }
  }

  elementComparer (billE, listE) {
    if (billE.name !== listE.name) return false
    else if (billE.trademark !== listE.trademark && listE.trademark !== 'not_given') return false
    else if (billE.unitType !== listE.unit_type) return false
    else return true
  }
}

exports.ListFunctions = ListFunctions