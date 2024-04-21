const users = [
  {
    id_user: 1,
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@live.com",
    password: "1",
    role: "owner",
  },
  {
    id_user: 2,
    name: "Jane Smith",
    phone: "987-654-3210",
    email: "jane@example.com",
    password: "5678",
    role: "owner",
  },
  {
    id_user: 3,
    name: "Bob Brown",
    phone: "403-586-4567",
    email: "bob@example.com",
    password: "7890",
    role: "coworker",
  },
];

function login(email, password) {
  const userExists = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!userExists) {
    return false
  }

  return {
    id_user: userExists.id_user,
    name: userExists.name,
    email: userExists.email,
    role: userExists.role,
  };
}

function create(user) {
  if (
    !user.name ||
    !user.phone ||
    !user.email ||
    !user.password ||
    !user.role
  ) {
    return null;
  }

  if (!["owner", "coworker"].includes(user.role)) {
    return null
  }

  const userExists = users.find((u) => u.email === user.email);

  if (userExists) {
    return false;
  }

  const userId = users.length + 1;

  const newUser = {
    id_user: userId,
    name: user.name,
    phone: user.phone,
    email: user.email,
    password: user.password,
    role: user.role,
  };

  users.push(newUser);

  return userId;
}

function getOwnerInfo(ownerId) {
  const userExists = users.find((u) => u.id_user == ownerId);

  if (!userExists) {
    return false;
  }

  const ownerInfo = {
    name: userExists.name,
    phone: userExists.phone,
    email: userExists.email
  };

  return ownerInfo

}

module.exports = {
  create,
  login,
  getOwnerInfo
};
