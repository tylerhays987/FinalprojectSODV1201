const express = require("express");
const api = express.Router();

const usersController = require("../controller/usersController");

api.post("/login", usersController.login);
api.post("/user", usersController.create);

module.exports = api;
