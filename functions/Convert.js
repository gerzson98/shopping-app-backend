'use strict'

/**
 * @typedef ConvertFunctions
 */

 class ConvertFunctions {
  resultToObject(resultOfQuery){
    return JSON.parse(JSON.stringify(resultOfQuery))
  }

  getDateNow(){
    return new Date(Date.now()).toISOString().slice(0, 10)
  }
  
  /**
  * @param {Array} data
  */
  simplyfyDates(data){
    data.forEach(element => {
      element.date = element.date.toISOString().slice(0, 10)
    })
    return data;
  }
 }

 exports.ConvertFunctions = ConvertFunctions