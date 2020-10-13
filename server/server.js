'use strict'

const { server } = require('../config/config')
const { attachRoutes } = require('../api/attachRoutes')

const express = require('express')
const app = express()


/**
 * todo(Bence): after config created normally we need to replace it with async
 */

const start = function (app) {
  const port = server.port
  attachRoutes(app).listen(port, () => {
    console.info(`Server running on ${port}`)
  })
}

start(app)