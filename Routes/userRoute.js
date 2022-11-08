const express = require('express');
const users = express.Router();
const userController = require('../controllers/userController')

users.post("/", userController.create);

module.exports = users;