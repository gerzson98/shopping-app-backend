'use strict'

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const { server } = require('../config/config')
const { attachRoutes } = require('../api/attachRoutes');

const app = express()
const port = server.port

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res) + ' ms'
  ].join(' | ')
}))

attachRoutes(app).listen(port, () => {
  console.log(`Server started on port:${port}`)
})