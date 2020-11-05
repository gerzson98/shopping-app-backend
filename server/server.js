'use strict'

const cors = require('cors');
const express = require('express');
const { server } = require('../config/config')
const { attachRoutes } = require('../api/attachRoutes')

const app = express()
const port = server.port

app.use(cors())
app.use(express.json())

attachRoutes(app).listen(port, () => {
  console.log(`Server started on port:${port}`)
})