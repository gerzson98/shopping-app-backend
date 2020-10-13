'use strict'

const { server } = require('../config/config')
const connectToDB = require('./mongoDB')
const { attachRoutes } = require('../api/attachRoutes')

const express = require('express')
const app = express()


/**
 * todo(Bence): after config created normally we need to replace it with async
 */

const start = async function (app) {
  const port = server.port
  try {
    await connectToDB()
  } catch (error) {
    console.log(error)
  }
  app.use(express.json())
  attachRoutes(app).listen(port, () => {
    console.info(`Server running on ${port}`)
  })
}

start(app)