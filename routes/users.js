const express = require('express');
const router = express.Router();
const _ = require('underscore');
const cors = require('cors');

var cntlUsers = require('../controllers/cntlUsers');

var Users = new cntlUsers('Process Users');

/* Routes Related to User Actions */
router.get('/get-users', cors(), _.bind(Users.getUsers, Users));

module.exports = router;
