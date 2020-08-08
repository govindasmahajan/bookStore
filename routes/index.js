const express = require('express');
const router = express.Router();
const _ = require('underscore');
const cors = require('cors');
const config = require('../config/config');


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'BookStore Application Backend'
	});
});

/*Check Health of the server*/
router.get('/health', function (req, res, next) {
	res.render('health', {
		title: 'BookStore Application Backend'
	});
});

module.exports = router;