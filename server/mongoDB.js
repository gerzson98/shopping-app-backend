'use strict'

const mongoose = require('mongoose')


/**
 * @description creates connection with database
 */
const connectToDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected | ${conn.connection.host}`)
}

module.exports = connectToDB;