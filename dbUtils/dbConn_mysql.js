var mysql = require('mysql');
var config = require('../config/config');
const dbConnection = config.dbServices.mysql;

module.exports = class DbConn {
  constructor() {
    this.db = null;
  }

  getDbConn() {
    this.db = mysql.createPool({
      connectTimeout: dbConnection.credentials.connectTimeout || 60000,
      acquireTimeout: dbConnection.credentials.acquireTimeout || 60000,
      connectionLimit: dbConnection.credentials.connectionLimit || 10,
      host: dbConnection.credentials.host,
      port: dbConnection.credentials.port,
      user: dbConnection.credentials.username,
      password: dbConnection.credentials.password,
      database: dbConnection.credentials.database
    });
    return this.db;
  }
};