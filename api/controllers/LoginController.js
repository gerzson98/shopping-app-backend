'use strict'

let approved = false
let tryCounter = 0
let locked = false
let lockedLevel = 0
let lockedTill

exports.lockedCheck = function (request, response) {
  response.status(200).json({locked: locked, until: lockedTill})
}

exports.passwordCheck = function (request, response) {
  let currentDate = Date.now()
  if (currentDate < lockedTill) response.status(200).json({approved: false, locked: true, duration: (lockedTill - currentDate)})
  else {
    if (request.body.pw === 'easyA42') {
      approved = true
      tryCounter = 0
      locked = false
      lockedLevel = 0
      lockedTill = currentDate
    } else {
      approved = false
      tryCounter++
      if (tryCounter > 4) {
        locked = true
        lockedLevel = tryCounter - 4
        lockedTill = Date.now() + (30000 * lockedLevel)
        setTimeout(function () {
          locked = false
        },
        30000 * lockedLevel)
      }
    }
    response.status(200).json({approved: approved, locked: locked, duration: (lockedLevel * 30)})
  }
}
