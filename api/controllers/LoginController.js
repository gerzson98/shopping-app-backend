'use strict'

exports.PasswordCheck = function (request, response) {
  if (request.body.pw === 'easyA42') response.status(200).json({approved: true})
  else response.status(200).json({approved: false})
}