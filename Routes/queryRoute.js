const express = require('express');
const users = express.Router();
const queryController = require('../controllers/dbQueryController')

users.get("/deneme", queryController.countries);

module.exports = users;