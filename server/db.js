const util = require('util')
const mysql = require('mysql2');
const { database } = require('../config/config')


const connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.db = () => {
  const connection = mysql.createConnection(database);
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    beginTransaction() {
      return util.promisify(connection.beginTransaction)
        .call(connection);
    },
    commit() {
      return util.promisify(connection.commit)
        .call(connection);
    },
    rollback() {
      return util.promisify(connection.rollback)
        .call(connection);
    },
    close() {
      return util.promisify(connection.end)
        .call(connection);
    },
  };
}
