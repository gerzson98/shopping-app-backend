'use strict'

const mongoose = require('mongoose')
const { database } = require('../config/config')
/**
 * @description creates connection with database
 */
const connectToDB = async () => {
  const conn = await mongoose.connect(database.mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected | ${conn.connection.host}`)
}

module.exports = connectToDB;