'use strict'

// function addCorsHeaders(request, response, next) {
//   response.header('Access-Control-Allow-Credentials', 'true')
//   response.header('Access-Control-Allow-Origin', '*')
//   response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, language')
//   response.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')

//   next && next()
//   return response
// }

function attachRoutes(app) {
  return app
}

exports.attachRoutes = attachRoutes