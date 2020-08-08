'use strict';

var dbConnection = require('../dbUtils/dbConn_mysql');

module.exports = class Utility {
    constructor(_name) {

    }

    getDbConnection(cb) {
        let dbConn = new dbConnection();
        let dbConnPool = dbConn.getDbConn();
        dbConnPool.getConnection(function (err, connection) {
            if (err) {
                return cb(err, null);
            } else {
                return cb(null, {
                    "error": null,
                    "connection": connection
                })
            }
        });
    }

};