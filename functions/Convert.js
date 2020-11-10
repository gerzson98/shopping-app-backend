'use strict'

/**
 * @typedef ConvertFunctions
 */

 class ConvertFunctions {
  resultToObject(resultOfQuery){
    return JSON.parse(JSON.stringify(resultOfQuery))
  }
 }

 exports.ConvertFunctions = ConvertFunctions