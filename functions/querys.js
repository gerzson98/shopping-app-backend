'use strict';

/**
 * @typedef QueryFunctions
 */

 class QueryFunctions {
  getAll (from) {
    return `SELECT * FROM ${from}`
  }

  add (e, arg) {
    e += arg
    return e
  }

  /**
   * 
   * @param {String} table 
   * @param {Array} columns 
   * @param {Array} conditions 
   */
  getByPrefs (table, columns, conditions) {
    let e = 'SELECT\n'
    if (!columns) {
      this.add(e, '*\n')
    } else {
      for (let i = 0; i < columns.length - 1; ++i) {
        this.add(e, columns[i] + ',\n')
      }
      this.add(e, columns[columns.length - 1] + '\n')
    }
    this.add(e, `From  shopping_app.${table}`)
    if (!conditions) {
      this.add(e, ';')
      return e
    } else {
      const lastIndex = conditions.length - 1
      this.add(e, '\nWHERE\n')
      for (let i = 0; i < conditions.length; ++i) {
        if (!conditions[i].operator) {
          this.add(e, `${conditions[i].column} = ${conditions[i].value}`)
        } else {
          this.add(e, `${conditions[i].column} ${conditions[i].operator} ${conditions[i].vale}`)
        }
        if (i === lastIndex) {
          this.add(e, ';')
        } else {
          this.add(e, ' AND\n')
        }
      }
    }
    return e
  }
 }

 exports.QueryFunctions = QueryFunctions