const express = require('express');
const router = express.Router();
const _ = require('underscore');
const cors = require('cors');

var cntlLoadSampleData = require('../controllers/cntlLoadSampleData');

var LoadSampleData = new cntlLoadSampleData('Load Sample Data');

/* Routes to load sample data in DB for rest of the operations */

router.get('/author-data', cors(), _.bind(LoadSampleData.addAuthorsData, LoadSampleData));
router.get('/publisher-data', cors(), _.bind(LoadSampleData.addPublishersData, LoadSampleData));
router.get('/book-data', cors(), _.bind(LoadSampleData.addBooksData, LoadSampleData));
router.get('/user-data', cors(), _.bind(LoadSampleData.addUsersData, LoadSampleData));

module.exports = router;