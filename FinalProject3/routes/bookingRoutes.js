const express = require("express");
const api = express.Router();

const bookingsController = require("../controller/bookingsController");

api.post("/booking", bookingsController.create);

module.exports = api;
