const express = require("express");
// const cors = require("cors");
const app = express();
const port = 3000;

const propertiesRoutes = require("./routes/propertiesRoutes");
const userRoutes = require("./routes/usersRoutes")
const bookingRoutes = require("./routes/bookingRoutes")

// Static files
app.use(express.static('public'));

app.use(express.json());
// app.use(cors());
app.use(propertiesRoutes);
app.use(userRoutes);
app.use(bookingRoutes);

app.listen(port, () => {
  console.log(`Api running on port ${port}`);
});
