'use strict';

const dbConfig = require('../config/config');
const Sequelize = require("sequelize");

const dbConnection = dbConfig.dbServices.mysql.credentials;
const dbPool = dbConnection.pool;

const sequelizeConn = new Sequelize(dbConnection.database, dbConnection.username, dbConnection.password, {
	host: dbConnection.host,
	dialect: dbConnection.dialect,
	ssl: dbConnection.ssl,
	dialectOptions: dbConnection.dialectOptions,

	pool: {
		max: dbPool.max,
		min: dbPool.min,
		acquire: dbPool.acquire,
		idle: dbPool.idle
	},
	define: {
		timestamps: false
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConn = sequelizeConn;

db.books = require("./Book")(sequelizeConn, Sequelize);
db.authors = require("./Author")(sequelizeConn, Sequelize);
db.publishers = require("./Publisher")(sequelizeConn, Sequelize);
db.users = require("./User")(sequelizeConn, Sequelize);
db.orders = require("./Order")(sequelizeConn, Sequelize);

db.books.belongsTo(db.authors, { foreignKey: 'author_id' });
db.books.belongsTo(db.publishers, { foreignKey: 'publisher_id' });

db.orders.belongsTo(db.books, { foreignKey: 'book_id' });
db.orders.belongsTo(db.users, { foreignKey: 'user_id' });

module.exports = db;
