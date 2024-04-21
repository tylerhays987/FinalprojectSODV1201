const properties = [
  {
    id: 1,
    address: "123 Main St",
    neighborhood: "Downtown",
    area: 100,
    parking: "Yes",
    public_transportation: "Yes",
    owner: 1,
    workspace_details: [
      {
        id: 1,
        type: "meeting_room",
        seating_capacity: 10,
        availability_date: "2024-03-15",
        lease_term: "month",
        price: 100,
      },
      {
        id: 2,
        type: "private_office",
        seating_capacity: 2,
        availability_date: "2024-03-20",
        lease_term: "week",
        price: 200,
      },
      {
        id: 3,
        type: "open_desk",
        seating_capacity: 1,
        availability_date: "2024-03-25",
        lease_term: "day",
        price: 50,
      },
    ],
  },
  {
    id: 2,
    address: "456 Oak St",
    neighborhood: "Uptown",
    area: 150,
    parking: "No",
    public_transportation: "Yes",
    owner: 1,
    workspace_details: [
      {
        id: 4,
        type: "meeting_room",
        seating_capacity: 8,
        availability_date: "2024-03-18",
        lease_term: "month",
        price: 120,
      },
      {
        id: 5,
        type: "private_office",
        seating_capacity: 3,
        availability_date: "2024-03-22",
        lease_term: "week",
        price: 250,
      },
      {
        id: 6,
        type: "open_desk",
        seating_capacity: 2,
        availability_date: "2024-03-28",
        lease_term: "day",
        price: 60,
      },
    ],
  },
  {
    id: 3,
    address: "789 Elm St",
    neighborhood: "Midtown",
    area: 200,
    parking: "Yes",
    public_transportation: "No",
    owner: 1,
    workspace_details: [
      {
        id: 7,
        type: "meeting_room",
        seating_capacity: 12,
        availability_date: "2024-03-20",
        lease_term: "month",
        price: 150,
      },
      {
        id: 8,
        type: "private_office",
        seating_capacity: 4,
        availability_date: "2024-03-25",
        lease_term: "week",
        price: 280,
      },
      {
        id: 9,
        type: "open_desk",
        seating_capacity: 3,
        availability_date: "2024-03-30",
        lease_term: "day",
        price: 70,
      },
    ],
  },
  {
    id: 4,
    address: "321 Pine St",
    neighborhood: "Downtown",
    area: 120,
    parking: "Yes",
    public_transportation: "Yes",
    owner: 2,
    workspace_details: [
      {
        id: 10,
        type: "meeting_room",
        seating_capacity: 6,
        availability_date: "2024-03-22",
        lease_term: "month",
        price: 110,
      },
      {
        id: 11,
        type: "private_office",
        seating_capacity: 2,
        availability_date: "2024-03-27",
        lease_term: "week",
        price: 220,
      },
      {
        id: 12,
        type: "open_desk",
        seating_capacity: 2,
        availability_date: "2024-04-01",
        lease_term: "day",
        price: 55,
      },
    ],
  },
];

function findAll() {
  return properties;
}

function find(propertyId) {
  const propertyIndex = properties.findIndex((property) => property.id == propertyId);

  if (propertyIndex === -1) {
    return false;
  }

  return properties[propertyIndex];
}

function create(propertyData) {
  const propertyId = properties.length + 1;
  propertyData.id = propertyId;

  properties.push(propertyData);
  return propertyId;
}

function update(id, propertyData) {
  const propertyIndex = properties.findIndex((property) => property.id == id);

  if (propertyIndex === -1) {
    return false;
  }

  properties[propertyIndex] = {
    id,
    ...propertyData
  };
  return true;
}

function remove(id) {
  const propertyIndex = properties.findIndex((property) => property.id == id);
  if (propertyIndex == -1) {
    return false;
  }

  properties.splice(propertyIndex, 1);

  return true;
}

module.exports = {
  findAll,
  create,
  update,
  remove,
  find
};
