'use strict'

const asyncHelper = require('../middleware/async')
const { UtilFunctions } = require('../../functions/Utils')
const { ListFunctions } = require('../../functions/ListFunctions')
const { ConvertFunctions } = require('../../functions/Convert')

exports.addList = asyncHelper(async (request, response) => {
  const listFunctions = new ListFunctions()
  let result = []
  if (Array.isArray(request.body.msg)) {
    const length = request.body.msg.length
    for (let i = 0; i < length; ++i) {
      let element = request.body.msg[i]
      result.push(await listFunctions.upLoadListElement(element))
    }
  }
  response.status(200).json(result)
})

exports.getList = asyncHelper(async (request, response) => {
  const utils = new UtilFunctions()
  const convert = new ConvertFunctions()
  const listFunctions = new ListFunctions()
  const result = await listFunctions.getList()
  let answer = convert.resultToObject(result)
  try {
    answer.forEach(element => {
      const newMetrics = utils.metricSimplify(element.unit_type, element.quantity)
      element.unit_type = newMetrics.unitType
      element.quantity = newMetrics.quantity
    })
  } catch (err) {
    try {
      let catcher = [answer]
      catcher.forEach(element => {
        const newMetrics = utils.metricSimplify(element.unit_type, element.quantity)
        element.unit_type = newMetrics.unitType
        element.quantity = newMetrics.quantity
      })
    } catch (error) {
      return {err, error}
    }
  }
  response.status(200).json(answer)
})

exports.updateList = asyncHelper(async (request, response) => {
  const listFunctions = new ListFunctions() 
  const result = await listFunctions.updateList(request.body)
  response.status(200).json(result)
})