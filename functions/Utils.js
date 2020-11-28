'use strict';

/**
 * @typedef UtilFunctions
 */

 class UtilFunctions {
  pickBest (shops, points) {
    let favShop = ''
    let maxPoints = 0
    if (shops.length != points.length) {
      const err = new Error('Valami a controllerben elbaszodott.')
      return err
    } else {
      for (let i = 0; i < shops.length; ++i) {
        if (points[i] > maxPoints) {
          maxPoints = points[i]
          favShop = shops[i]
        }
      }
      return favShop
    }
  }

  defaultSetter (location, element) {
    const input = element
    if (!input.trademark)
      element.trademark = location
    if (!input.unitSize)
      element.unitSize = 1
    if (!input.unitType)
      element.unitType = 'db'
    if (!input.quantity)
      element.quantity = 1
    
    return element
  }
 }

 exports.UtilFunctions = UtilFunctions
