const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, 'data', 'users.json');
const propertiesPath = path.join(__dirname, 'data', 'properties.json');
const bookingsPath = path.join(__dirname, 'data', 'bookings.json');

const readUserFromFile = () => {
  const user = fs.readFileSync(usersPath, 'utf8');
  return JSON.parse(user);
};

const readPropertyFromFile = () => {
  const property = fs.readFileSync(propertiesPath, 'utf8');
  return JSON.parse(property);
};

const readBookingFromFile = () => {
  const booking = fs.readFileSync(bookingsPath, 'utf8');
  return JSON.parse(booking);
};

router.get('/users', (req, res) => {
  const usersData = readUserFromFile();
  res.json(usersData);
});

router.get('/properties', (req, res) => {
  const propertiesData = readPropertyFromFile();
  res.json(propertiesData);
});

router.get('/bookings', (req, res) => {
  const bookingsData = readBookingFromFile();
  res.json(bookingsData);
});

// Route to validate login
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = readUserFromFile();

//   // Ensure userData is an array
//   if (!Array.isArray(userData)) {
//     res.status(500).json({ message: 'User data is not valid' });
//     return;
//   }

//   // Find the user based on email and password
//   const currentUser = user.find(u => u.email === email && u.password === password);

//   if (currentUser) {
//     res.status(200).json({ message: 'Login successful', user: currentUser });
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' });
//   }
// });

router.get('/search', (req, res) => {

  // Get the query term
  const searchTerm = req.query.q.toLowerCase();

  const results = [];
  const data = readPropertyFromFile();

  data.properties.forEach(property => {

    if (property.address.toLowerCase().includes(searchTerm)) {

      let searchResultObject = {
        type: "property",
        propertyId: property.id,
        propertyAddress: property.address
      };
      results.push(searchResultObject);
    }
  });

  res.json(results);
});

// router.get('/properties/:propertieId', (req, res) => {
//   const propertiesData = readPropertyFromFile();
//   const propertieId = parseInt(req.params.propertieId);
//   const propertie = propertiesData.properties.find(propertie => propertie.id === propertieId);
//   if (!propertie) {
//       res.status(404).send('Property not found');
//   } else {
//       res.json(propertie);
//   }
// });

module.exports = router;