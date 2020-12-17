'use strict';

/**
 * @typedef UtilFunctions
 */

 class UtilFunctions {
  pickBest (shops, points) {
    let favShop = ''
    let maxPoints = 0
    if (shops.length != points.length) {
      const err = new Error('Valami a controllerben elcsúszott.')
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

  metricDefaulter (unitType, unitSize, quantity) {
    switch (unitType) {
      case 'kg':
        unitType = 'g'
        quantity *= unitSize * 1000
        unitSize = 1
        break;
      case 'g':
        quantity *= unitSize
        unitSize = 1
        break;
      case 'l':
        unitType = 'ml'
        quantity *= unitSize * 1000
        unitSize = 1
        break;
      case 'ml':
        quantity *= unitSize
        unitSize = 1
        break;
      case 'db':
        quantity *= unitSize
        unitSize = 1
        break;
      default:
        console.log('unitType got wrong somewhere before default setting.')
        break;
    }

    return {unitType: unitType, unitSize: unitSize, quantity: quantity}
  }
  
  // if matchable, returns true, otherwise returns false.
  metricTypeMatching (unitType, unitTypeTo) {
    switch (unitType) {
      case 'kg':
        if (unitTypeTo !== 'g' && unitTypeTo !== 'kg') return false
        break;
      case 'g':
        if (unitTypeTo !== 'g' && unitTypeTo !== 'kg') return false
        break;
      case 'l':
        if (unitTypeTo !== 'ml' && unitTypeTo !== 'l') return false
        break;
      case 'ml':
        if (unitTypeTo !== 'ml' && unitTypeTo !== 'l') return false
        break;
      case 'db':
        if (unitTypeTo !== 'db') return false
        break;
      default:
        return false
   }
   return true
  }

  metricSimplify (unitType, quantity) {
    if (quantity / 500 < 1) return {unitType, quantity}
    else {
      switch (unitType) {
        case 'g':
          unitType = 'kg'
          quantity /= 1000
          break;
        case 'ml':
          unitType = 'l'
          quantity /= 1000
          break;
        default:
          break;
      }
      return {unitType, quantity}
    }
  }
 }


 exports.UtilFunctions = UtilFunctions
