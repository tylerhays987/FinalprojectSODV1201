const bookingsModel = require("../models/bookingsModel");
const propertiesModel = require("../models/propertiesModel")
const usersModel = require('../models/usersModel')

function create(req, res) {
    const bookingData = req.body;

    const bookingId = bookingsModel.create(bookingData);

    if (bookingId) {
        const propertyInfo = propertiesModel.find(bookingData.id_property)

        if (!propertyInfo) {
            res.status(400).json({ message: "Property does not exist" });
        }

        const ownerInfo = usersModel.getOwnerInfo(propertyInfo.owner)

        if (!ownerInfo) {
            res.status(400).json({ message: "Owner does not exist" });
        }

        res.status(201).json(ownerInfo);
    } else {
        res.status(400).json({ message: "Booking creation failed" });
    }
}

module.exports = {
    create,
};
