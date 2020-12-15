'use strict'

const asyncHelper = require('../middleware/async')
const { ListFunctions } = require('../../functions/ListFunctions.js')
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
  const convert = new ConvertFunctions()
  const listFunctions = new ListFunctions()
  const result = await listFunctions.getList()
  const answer = convert.resultToObject(result)
  response.status(200).json(answer)
})