const propertiesModel = require("../models/propertiesModel");

function list(req, res) {
  //1 - Check if filters are set
  // const filters = req.params.id

  //Get all properties data from model
  const properties = propertiesModel.findAll();
  //Send the properties data as a response
  res.json(properties);
}

function create(req, res) {
  // Get the property data from the request body
  const propertyData = req.body;
  if (!Object.keys(propertyData).length) {
    res.json({ error: "Invalid body" });
  }
  // Add the new property to the model
  const newPropertyId = propertiesModel.create(propertyData);
  // Send the new property as a response
  res.json({ id: newPropertyId });
}

function update(req, res) {
  // Get the property id from the request parameters
  const id = req.params.id;
  // Get the property data from the request body
  const propertyData = req.body;
  // Update the property in the model
  const response = propertiesModel.update(id, propertyData);

  if (!response) {
    // Send a 404 response if the property is not found
    res.status(404).json({ message: "Property not found" });
    return;
  }

  // Send a success response
  res.json({ message: "Property updated successfully", id });
}

function remove(req, res) {
  // Get the property id from the request parameters
  const id = req.params.id;

  // Remove the property from the model
  const response = propertiesModel.remove(id);

  if (!response) {
    // Send a 404 response if the property is not found
    res.status(404).json({ message: "Property not found" });
    return;
  }

  // Send a success response
  res.json({ message: "Property removed successfully" });
}

function read(req, res) {
  // Get the property id from the request parameters
  const id = req.params.id;

  // Remove the property from the model
  const propertyExists = propertiesModel.find(id);

  if (!propertyExists) {
    // Send a 404 response if the property is not found
    res.status(404).json({ message: "Property not found" });
    return;
  }

  // Send a success response
  res.json(propertyExists);
}

module.exports = {
  list,
  create,
  update,
  remove,
  read
};
