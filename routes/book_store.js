const express = require('express');
const router = express.Router();
const _ = require('underscore');
const cors = require('cors');

var cntlLoadSampleData = require('../controllers/cntlLoadSampleData');
var cntlBooks = require('../controllers/cntlBooks');
var cntlUsers = require('../controllers/cntlUsers');
const Book = require('../models/Book');

var LoadSampleData = new cntlLoadSampleData('Load Sample Data');
var Books = new cntlBooks('Process Books');
var Users = new cntlUsers('Process Users');

/* Routes to load sample data in DB for rest of the operations */

router.post('/load-author-data', cors(), _.bind(LoadSampleData.addAuthorsData, LoadSampleData));
router.post('/load-publisher-data', cors(), _.bind(LoadSampleData.addPublishersData, LoadSampleData));
router.post('/load-book-data', cors(), _.bind(LoadSampleData.addBooksData, LoadSampleData));
router.post('/load-user-data', cors(), _.bind(LoadSampleData.addUsersData, LoadSampleData));

/* Routes to manage books & users transactions */
router.get('/get-books', cors(), _.bind(Books.getBooks, Books));
router.post('/book-details', cors(), _.bind(Books.getBookDetailsById, Books));
router.post('/order-book', cors(), _.bind(Books.userOrderBook, Books));
router.put('/return-book/:order_id', cors(), _.bind(Books.returnBookById, Books));
router.get('/order-history', cors(), _.bind(Books.orderHistory, Books));

module.exports = router;
