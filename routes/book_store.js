const express = require('express');
const router = express.Router();
const _ = require('underscore');
const cors = require('cors');

var cntlBooks = require('../controllers/cntlBooks');

var Books = new cntlBooks('Process Books');

/* Routes to manage books & users transactions */
router.get('/get-books', cors(), _.bind(Books.getBooks, Books));
router.post('/book-details', cors(), _.bind(Books.getBookDetailsById, Books));
router.post('/book-orders', cors(), _.bind(Books.getBookOrdersById, Books));
router.post('/order-book', cors(), _.bind(Books.userOrderBook, Books));
router.put('/return-book/:order_id', cors(), _.bind(Books.returnBookById, Books));
router.get('/order-history', cors(), _.bind(Books.orderHistory, Books));

module.exports = router;
