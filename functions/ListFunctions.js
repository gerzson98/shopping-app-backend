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
    console.log(id)
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
    if (!element.trademark) element.trademark = 'not_given'
    const defaults = utilFunctions.metricDefaulter(element.unitType, element.unitSize, element.quantity)
    element.unitType = defaults.unitType
    element.quantity = defaults.quantity
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

}

exports.ListFunctions = ListFunctions