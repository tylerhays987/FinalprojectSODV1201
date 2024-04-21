const express = require("express");
const api = express.Router();

const propertiesController = require("../controller/propertiesController");

api.get("/properties", propertiesController.list);
api.post("/properties", propertiesController.create);
api.put("/properties/:id", propertiesController.update);
api.delete("/properties/:id", propertiesController.remove);
api.get("/property/:id", propertiesController.read);

module.exports = api;
