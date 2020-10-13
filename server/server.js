'use strict'

const connectToDB = require('./mongoDB')
const { server } = require('../config/config')
const { attachRoutes } = require('../api/attachRoutes')

const express = require('express')
const app = express()

const start = async function (app) {
  const port = server.port
  if(!port) return new Error('[ERROR] | port nr. cannot be imorted |')
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