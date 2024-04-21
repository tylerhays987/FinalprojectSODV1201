const usersModel = require("../models/usersModel");

function login(req, res) {
  const { email, password } = req.body;
  const userExists = usersModel.login(email, password);

  if (userExists) {
    res.status(200).json({ message: "Login successful", user: userExists });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
}

function create(req, res) {
  const user = req.body;
  const userId = usersModel.create(user);

  if (userId) {
    res.status(201).json({ id: userId });
  } else {
    res.status(400).json({ message: "User creation failed" });
  }
}

module.exports = {
  login,
  create,
};
