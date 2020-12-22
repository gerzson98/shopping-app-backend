'use strict';

/**
 * @typedef QueryFunctions
 */

 class QueryFunctions {
  getAll (from) {
    return `SELECT * FROM shopping_app.${from}`
  }

  add (e, arg) {
    e += arg
    return e
  }

  /**
   * @param {String} table 
   * @param {Array} columns 
   * @param {Array} conditions 
   */
  getByPrefs (table, columns, conditions) {
    let queryString = 'SELECT\n'

    if (!columns) {
      queryString += '*\n'
    } else {
      for (let i = 0; i < columns.length - 1; ++i) {
        queryString += columns[i] + ',\n'
      }
      queryString += columns[columns.length - 1] + '\n'
    }
    queryString += `FROM shopping_app.${table}`
    if (!conditions) {
      queryString += ';'
      return queryString
    } else {
      const lastIndex = conditions.length - 1
      queryString += '\nWHERE\n'
      for (let i = 0; i < conditions.length; ++i) {
        if (!conditions[i].operator) queryString += `${conditions[i].column} = '${conditions[i].value}'`
        else queryString += `${conditions[i].column} ${conditions[i].operator} '${conditions[i].value}'`
        if (i === lastIndex) queryString += ';'
        else queryString += ' AND\n'
      }
    }
    return queryString
  }
 }

 exports.QueryFunctions = QueryFunctions