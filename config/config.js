"use strict";
const dev = require("./dev.js"),
    local = require('./local.js');

const env = process.env.NODE_ENV || 'LOCALHOST';

const config = {
    DEV: dev,
    LOCALHOST: local,
}

module.exports = config[env];