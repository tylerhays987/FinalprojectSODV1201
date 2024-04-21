const bookings = [
    {
        "id": 1,
        "id_user": 1,
        "id_property": 1,
        "date": "2024-03-25",
        "start_time": "09:00",
        "end_time": "17:00"
    }
]

function create(bookingData) {
    const bookingId = bookings.length + 1;
    bookingData.id = bookingId;

    bookings.push(bookingData);
    return bookingId;
}

module.exports = {
    create
}