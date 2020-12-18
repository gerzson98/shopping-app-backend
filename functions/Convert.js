'use strict'

const { UtilFunctions } = require('./Utils')

/**
 * @typedef ConvertFunctions
 */

 class ConvertFunctions {
  resultToObject (resultOfQuery) {
    return JSON.parse(JSON.stringify(resultOfQuery))
  }

  getDateNow(){
    return new Date(Date.now()).toISOString().slice(0, 10)
  }

  createSimpleArray (array) {
    let result = []
    array.forEach(element => {
      result.push(element.name)
    })
    return result
  }
  
  /**
  * @param {Array} data
  */
  simplyfyDates (data) {
    data.forEach(element => {
      element.date = element.date.toISOString().slice(0, 10)
    })
    return data;
  }

  fromBEtoLE (billE) {
    const util = new UtilFunctions()
    const metrics = util.metricDefaulter(billE.unitType, billE.unitSize, billE.quantity)
    if (!billE.trademark) billE.trademark = 'not_given'
    return {
      name: util.stringSimplify(billE.name),
      trademark: util.stringSimplify(billE.trademark),
      unitType: metrics.unitType,
      quantity: metrics.quantity
    }
  }

 }

 exports.ConvertFunctions = ConvertFunctions