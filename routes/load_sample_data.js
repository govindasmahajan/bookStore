const express = require('express');
const router = express.Router();
const _ = require('underscore');
const cors = require('cors');

var cntlLoadSampleData = require('../controllers/cntlLoadSampleData');

var LoadSampleData = new cntlLoadSampleData('Load Sample Data');

/* Routes to load sample data in DB for rest of the operations */

router.post('/author-data', cors(), _.bind(LoadSampleData.addAuthorsData, LoadSampleData));
router.post('/publisher-data', cors(), _.bind(LoadSampleData.addPublishersData, LoadSampleData));
router.post('/book-data', cors(), _.bind(LoadSampleData.addBooksData, LoadSampleData));
router.post('/user-data', cors(), _.bind(LoadSampleData.addUsersData, LoadSampleData));

module.exports = router;