
module.exports = {
	dbServices: {
		"mysql": {
			"name": "book_store",
			"label": "mysql",
			"plan": "Shared",
			"credentials": {
				"host": "localhost",
				"port": "3306",
				"username": process.env.DB_USER || "root",
				"password": process.env.DB_PWD || "root@password123",
				"database": process.env.DB_NAME || "book_store",
				"connectionLimit": 10,
				"dialect": "mysql",
				"ssl": false,
				"dialectOptions": { supportBigNumbers: true },
				"pool": {
					"max": 10,
					"min": 0,
					"acquire": 30000,
					"idle": 10000
				}
			}
		}
	}
}
