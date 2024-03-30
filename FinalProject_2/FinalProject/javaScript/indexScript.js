$(document).ready(function () {

    // Define current user
    let currentUser = null;

    // Define an array to store user data
    let userData = [
        {
            id_user: 1,
            name: "John Doe",
            phone: "123-456-7890",
            email: "john@live.com",
            password: "1",
            role: "owner"
        },
        {
            id_user: 2,
            name: "Jane Smith",
            phone: "987-654-3210",
            email: "jane@example.com",
            password: "5678",
            role: "owner"
        },
        {
            id_user: 3,
            name: "Bob Brown",
            phone: "403-586-4567",
            email: "bob@example.com",
            password: "7890",
            role: "coworker"
        }
    ];

    // Define an array to store properties data
    let propertiesData = [
        {
            id: 1,
            address: "123 Main St",
            neighborhood: "Downtown",
            area: 100,
            parking: "Yes",
            public_transportation: "Yes",
            owner: 1,
            workspace_details: {
                meeting_room: {
                    seating_capacity: 10,
                    availability_date: "2024-03-15",
                    lease_term: "month",
                    price: 100
                },
                private_office: {
                    seating_capacity: 2,
                    availability_date: "2024-03-20",
                    lease_term: "week",
                    price: 200
                },
                open_desk: {
                    seating_capacity: 1,
                    availability_date: "2024-03-25",
                    lease_term: "day",
                    price: 50
                }
            }
        },
        {
            id: 2,
            address: "456 Oak St",
            neighborhood: "Uptown",
            area: 150,
            parking: "No",
            public_transportation: "Yes",
            owner: 1,
            workspace_details: {
                meeting_room: {
                    seating_capacity: 8,
                    availability_date: "2024-03-18",
                    lease_term: "month",
                    price: 120
                },
                private_office: {
                    seating_capacity: 3,
                    availability_date: "2024-03-22",
                    lease_term: "week",
                    price: 250
                },
                open_desk: {
                    seating_capacity: 2,
                    availability_date: "2024-03-28",
                    lease_term: "day",
                    price: 60
                }
            }
        },
        {
            id: 3,
            address: "789 Elm St",
            neighborhood: "Midtown",
            area: 200,
            parking: "Yes",
            public_transportation: "No",
            owner: 1,
            workspace_details: {
                meeting_room: {
                    seating_capacity: 12,
                    availability_date: "2024-03-20",
                    lease_term: "month",
                    price: 150
                },
                private_office: {
                    seating_capacity: 4,
                    availability_date: "2024-03-25",
                    lease_term: "week",
                    price: 280
                },
                open_desk: {
                    seating_capacity: 3,
                    availability_date: "2024-03-30",
                    lease_term: "day",
                    price: 70
                }
            }
        },
        {
            id: 4,
            address: "321 Pine St",
            neighborhood: "Downtown",
            area: 120,
            parking: "Yes",
            public_transportation: "Yes",
            owner: 2,
            workspace_details: {
                meeting_room: {
                    seating_capacity: 6,
                    availability_date: "2024-03-22",
                    lease_term: "month",
                    price: 110
                },
                private_office: {
                    seating_capacity: 2,
                    availability_date: "2024-03-27",
                    lease_term: "week",
                    price: 220
                },
                open_desk: {
                    seating_capacity: 2,
                    availability_date: "2024-04-01",
                    lease_term: "day",
                    price: 55
                }
            }
        }
    ];


    let coworkerBooking = []; // Patricia - array to store bookings

    // Log the initial user data
    console.log("Initial userData:", userData);

    // Log the initial properties data
    console.log("Initial propertiesData:", propertiesData);

    // Function to log userData array
    function logUserData() {
        console.log("Current userData:", userData);
    }

    // Function to show the index page
    function showIndexPage() {
        $(".index").show();
        $(".login, .signup, .owner, .coworker").hide();
        email = $("#loginEmail").val(""); //Patricia    
        password = $("#loginPassword").val(""); //Patricia
    }

    // Show login form when login button is clicked
    $("#login-btn").click(function () {
        $(".index").hide();
        $(".signup, .owner, .coworker").hide();
        $(".login").toggle(); // Toggle the visibility of the login form
    });

    // Show signup form when signup button is clicked
    $("#signup-btn").click(function () {
        $(".index").hide();
        $(".login, .owner, .coworker").hide();
        $(".signup").toggle(); // Toggle the visibility of the signup form
    });

    // Event handler for the back button click
    $(".login .backBtn, .signup .backBtn").click(function () {
        showIndexPage();
    });

    // Function to fill property listings
    function fillListing(container, ownerId) {
        container.empty();
        propertiesData.forEach(property => {
            if (!ownerId || property.owner === ownerId) {
                container.append(`<div>${property.address}</div>`);
                // Add more property details to the listing as needed
            }
        });
    }

    // Function to populate property listings for owners
    function populateOwnerListings(ownerId) {
        let ownerListingsContainer = $("#listingsSection");
        ownerListingsContainer.empty();
        propertiesData.forEach(property => {
            if (property.owner === ownerId) {
                ownerListingsContainer.append(`
                <div id="ownerListings">
                    <span>${property.address}</span>
                    <br>
                    <button class="editPropertyBtn" data-property-id="${property.id}">Edit</button>
                    <button class="deletePropertyBtn" data-property-id="${property.id}">Delete</button>
                </div>`);
                // Add more property details to the listing as needed
            }
        });

        // Show the listings section with data added
        $("#listingsSection").show(); //Patricia - display updated listing after addition of new property

        // Hide the create form section
        $("#createFormSection").hide(); // Patricia - hide form of property addition
    }

    // Function to populate property listings for coworkers
    function populateCoworkerListings() {
        let coworkerListingsContainer = $(".coworkerListings");
        coworkerListingsContainer.empty();
        propertiesData.forEach(property => {
            let propertyDetailsHtml = `
            <div id="coworkerListings">
                <p>Address: ${property.address}</p>
                <p>Neighborhood: ${property.neighborhood}</p>
                <p>Area: ${property.area} sq. ft.</p>
                <p>Parking: ${property.parking}</p>
                <p>Public Transportation: ${property.public_transportation}</p>
                <p>Workspace Details:</p>
                <ul>
                    <li>Meeting Room - Capacity: ${property.workspace_details.meeting_room.seating_capacity}, Price: $${property.workspace_details.meeting_room.price}</li><br>
                    <li>Private Office - Capacity: ${property.workspace_details.private_office.seating_capacity}, Price: $${property.workspace_details.private_office.price}</li><br>
                    <li>Open Desk - Capacity: ${property.workspace_details.open_desk.seating_capacity}, Price: $${property.workspace_details.open_desk.price}</li>
                </ul>
                <button class="reservePropertyBtn" data-property-id="${property.id}">Reserve</button>
            </div>`;
            coworkerListingsContainer.append(propertyDetailsHtml);
        });
    }

    // Event handler for the reserve button click
  //  $(document).on("click", ".reserveBtn", function () { // comentado por Patricia
    $(document).on("click", ".reservePropertyBtn", function () { // Patricia
        let propertyId = $(this).data("property-id");
        let property = propertiesData.find(prop => prop.id === propertyId);
        // Set selectedOwnerId to the owner's id of the selected property
        selectedOwnerId = property.owner; // Patricia - this variable will be used to populate array of booking (.reservationForm)
        selectedOwnerProp = property.id; // Patricia - this variable will be used to populate array of booking (.reservationForm)

        if (property) {
            // Populate property details in the reservation section
            $("#propertyName").text(property.address);
            $("#propertyDescription").text(property.Description);

            // Hide the search bar and coworker listing
            $(".searchBar, .coworkerListings").hide();

            // Show the reservation section
            $("#reservation").show();
        }
    });


//Patricia - begin
    // Function to handle both cancel and back buttons of Booking
    function handleCancelBackButtons_Booking() {
        // Show the search bar and coworker listing
        $(".searchBar, .coworkerListings").show();

        // Hide the reservation section
        $("#reservation").hide();
    }

    // Bind the function to both buttons
    $("#cancelReservationBtn, #backBtnBook").click(handleCancelBackButtons_Booking); 
// Patricia - end



    // Event handler for the reservation form submission
    $("#reservationForm").submit(function (e) {
        e.preventDefault();
        // Logic to handle reservation submission goes here
        //Patricia - begin
    //Variable to populate array of co-worker bookings - Patricia
        var Booking = {
            id_user: currentUser.id_user,
            id_owner: selectedOwnerId,
            id_property: selectedOwnerProp,
            date: $("#reservationDate").val(),
            start_time: $("#startTime").val(),
            end_time: $("#endTime").val(),
        };
        coworkerBooking.push(Booking);
        console.log(coworkerBooking);
        $("#ownerContact").html(`
            <h2><strong> To book a space, please contact directly the owner through: </strong></h2>
            <p><strong>Owner: ${currentUser.name} </strong></p>
            <p><strong>Phone: ${currentUser.phone}</strong></p>
            <p><strong>Email:</strong> <a href="mailto:${currentUser.email}" style="color: blue; text-decoration: none;">${currentUser.email}</a></p>
        `); 
    }); // Patricia - end


    


    // Function to handle user login
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        try { // patricia
            var email = $("#loginEmail").val();
            var password = $("#loginPassword").val();
            currentUser = userData.find(function (u) {
                return u.email === email && u.password === password;
            });
            if (currentUser) {
                console.log("User logged in:", currentUser);
                $(".index, .login, .signup").hide();
                if (currentUser.role === "owner") {
                    $(".owner").show();
                    populateOwnerListings(currentUser.id_user);
                } else if (currentUser.role === "coworker") {
                    $(".coworker").show();
                    populateCoworkerListings();
                }
            } else {
                console.log("Invalid email or password");
                throw new Error('Invalid username or password. Please try again.'); // patricia
            }
        } catch (error) { // Patricia
            console.error('Error:', error);
            alert('Error: ' + error.message); // Display custom error message
        }
    });

    // Function to handle signup
    $("#signupForm").submit(function (e) {
        e.preventDefault();
        var newUser = {
            id_user: generateUserId(),
            name: $("#name").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            role: $("#role").val()
        };
        userData.push(newUser);
        console.log("User signed up:", newUser);
        console.log("Updated userData:", userData); // Log updated userData array
        logUserData(); // Log updated userData array
        // Clear signup form fields after successful signup
        $("#signupForm")[0].reset();
        console.log("User role:", newUser.role); // Log user's role
        if (newUser.role === "owner") {
            $(".index, .login, .signup, .coworker").hide();
            $(".owner").toggle(); // Toggle the visibility of the owner page
            // Fill the listing with properties owned by the user
            fillListing($(".owner .Listings"), newUser.id_user);
        } else if (newUser.role === "coworker") {
            showIndexPage(); // Hide all pages before showing the coworker page
            $(".coworker").toggle(); // Toggle the visibility of the coworker page
            // Fill the listing with all properties
            fillListing($(".coworker .Listings"));
        }
    });

    // Function to handle logout
    $("#logout-btn").click(function () {
        showIndexPage(); // Show index page when logout button is clicked
        console.log("User logged out");
        // You can add code to clear logged-in user information here
    });

    // Function to generate a unique user ID
    function generateUserId() {
        return "user_" + Math.floor(Math.random() * 1000);
    }

    // Function to show the create form section and hide the listings section
    function showCreateForm() {
        // Show the create form section
        $("#createFormSection").show();
        // Hide the listings section
        $("#listingsSection").hide();
        // Back to listing section
        $(".backBtn").show();
    }

    // Event handler for the back button click
    $("#backBtn").click(function () {
        $("#createFormSection").hide();
        $("#listingsSection").show();
        $(".backBtn").hide(); // Hide the back button when returning to the listings section

        // Set the availability date field with today's date
        let today = new Date().toISOString().slice(0, 10); // Get today's date in yyyy-mm-dd format
        $("#availability_date").val(today); // Set the value of the availability_date input field
    });

    // Function to toggle visibility of listing section
    function showListingSection() { 
        //$("#createFormSection").toggle(); // Toggle visibility of create form section - // commented by Patricia
         $("#listingsSection").toggle(); // Toggle visibility of listings section
       // if ($("#listingsSection").is(":visible")) { // commented by Patricia
       
            // Populate property listings based on current user role
            if (currentUser && currentUser.role === "owner") {
                populateOwnerListings(currentUser.id_user);
            } else if (currentUser && currentUser.role === "coworker") {
                populateCoworkerListings();
            }
       }
   // }

   

    // Event handler for the "Create New Listing" button click
    $(".ownerListingNav button").click(function () {
        // Toggle between showing the create form section and the listings section
        if ($("#createFormSection").is(":visible")) {
            // If the create form section is visible, show the listings section
            showListingsSection();
        } else {
            // If the create form section is not visible, show the create form section
            showCreateForm();
            clearCreateForm();
        }
    });

    $("#createListingBtn").click(function () {
        // Call the showCreateForm function
        showCreateForm();
    });

    // Event handler for edit property button click
    $(document).on("click", ".editPropertyBtn", function () {
        let propertyId = $(this).data("property-id");
        $("#deleteBtn").data("property-id", propertyId);
        let property = propertiesData.find(prop => prop.id === propertyId);
        if (property) {
            // Populate the create form with property data
            $("#address").val(property.address);
            $("#neighborhood").val(property.neighborhood);
            $("#area").val(property.area);
            //$("#parking").val(property.parking); // comentado por Patricia
           // $("#public_transportation").val(property.public_transportation); // comentado por Patricia
           $("#parking").val(property.parking.toLowerCase()); // patricia
           $("#public_transportation").val(property.public_transportation.toLowerCase()); // Patricia
            // Populate workspace details
            let workspaceDetails = property.workspace_details;
            $("#workspace_type").val(Object.keys(workspaceDetails)[0]);
            $("#seating_capacity").val(workspaceDetails[Object.keys(workspaceDetails)[0]].seating_capacity);
            $("#availability_date").val(workspaceDetails[Object.keys(workspaceDetails)[0]].availability_date);
            $("#lease_term").val(workspaceDetails[Object.keys(workspaceDetails)[0]].lease_term);
            $("#price").val(workspaceDetails[Object.keys(workspaceDetails)[0]].price);
            $("#Description").val(property.Description);
            // Switch to create form section
            showCreateForm();
        }
    });

    // Function to clear the create form fields
    function clearCreateForm() {
        $("#propertyForm")[0].reset(); // Reset the form fields to their default state
    }

    // Function to handle property submission
    $("#propertyForm").submit(function (e) {
        e.preventDefault();
        // Get form data
        let formData = {
            id: propertiesData.length + 1, // Generate a new unique ID for the property
            address: $("#address").val(),
            neighborhood: $("#neighborhood").val(),
            area: $("#area").val(),
            parking: $("#parking").val(),
            public_transportation: $("#public_transportation").val(),
            owner: currentUser.id_user,
            workspace_details: {
                [$("#workspace_type").val()]: {
                    seating_capacity: $("#seating_capacity").val(),
                    availability_date: $("#availability_date").val(),
                    lease_term: $("#lease_term").val(),
                    price: $("#price").val()
                }
            }
        };

        // Add the new property to the propertiesData array
        propertiesData.push(formData);

        // Log the updated propertiesData array
        console.log("Updated propertiesData:", propertiesData);

        // Clear the form fields
        clearCreateForm();

        // Show the owner's property listings again
        populateOwnerListings(currentUser.id_user);

        // Switch back to the listings section
    //    showListingSection(); // comentado por patricia - 03/13/24
        
    });

    // Function to delete a property by ID and refresh the property listings
    function deleteProperty(propertyId) {
        console.log("Deleting property with ID:", propertyId);
        // Find the index of the property to delete
        let indexToDelete = propertiesData.findIndex(prop => prop.id === parseInt(propertyId));
        console.log("Index to delete:", indexToDelete);
        if (indexToDelete !== -1) {
            // Remove the property from the propertiesData array
            propertiesData.splice(indexToDelete, 1);
            // Log the updated propertiesData array
            console.log("Property deleted. Updated propertiesData:", propertiesData);
            // Clear the form fields
            clearCreateForm();
            // Show the owner's property listings again

            console.log(currentUser.id_user);
            populateOwnerListings(currentUser.id_user);
            // Switch back to the listings section
            showListingSection();
        } else {
            console.log("Property not found");
        }
    }

    // Event handler for the delete button click
    $(document).on("click", ".deletePropertyBtn", function (e) {
        e.preventDefault();
        console.log("Delete button clicked");
        let propertyId = $(this).data("property-id");
        console.log("Property ID:", propertyId);
        deleteProperty(propertyId);
    });

    // Populate dropdown menus with property details
    function populateDropdowns() {
        let seatsDropdown = $("#seatsDropdown");
        let priceDropdown = $("#priceDropdown");
        let sqftDropdown = $("#sqftDropdown");

        // Collect unique values for seats, price, and square footage from propertiesData
        let seatsSet = new Set();
        let priceSet = new Set();
        let sqftSet = new Set();

        propertiesData.forEach(property => {
            seatsSet.add(property.workspace_details.meeting_room.seating_capacity);
            seatsSet.add(property.workspace_details.private_office.seating_capacity);
            seatsSet.add(property.workspace_details.open_desk.seating_capacity);

            priceSet.add(property.workspace_details.meeting_room.price);
            priceSet.add(property.workspace_details.private_office.price);
            priceSet.add(property.workspace_details.open_desk.price);

            sqftSet.add(property.area);
        });

        // Populate dropdowns with unique values
        seatsSet.forEach(value => {
            seatsDropdown.append(`<option value="${value}">${value}</option>`);
        });

        priceSet.forEach(value => {
            priceDropdown.append(`<option value="${value}">${value}</option>`);
        });

        sqftSet.forEach(value => {
            sqftDropdown.append(`<option value="${value}">${value} sq. ft.</option>`);
        });
    }

    // Filter properties based on selected options
    function filterProperties() {
        let filteredProperties = propertiesData.filter(property => {
            let selectedSeats = $("#seatsDropdown").val();
            let selectedPrice = $("#priceDropdown").val();
            let selectedSqft = $("#sqftDropdown").val();

            return (selectedSeats === "placeholder" || property.workspace_details.meeting_room.seating_capacity == selectedSeats ||
                property.workspace_details.private_office.seating_capacity == selectedSeats ||
                property.workspace_details.open_desk.seating_capacity == selectedSeats) &&
                (selectedPrice === "placeholder" || property.workspace_details.meeting_room.price == selectedPrice ||
                    property.workspace_details.private_office.price == selectedPrice ||
                    property.workspace_details.open_desk.price == selectedPrice) &&
                (selectedSqft === "placeholder" || property.area == selectedSqft);
        });

        // Display filtered properties (you can customize this according to your needs)
        console.log("Filtered Properties:", filteredProperties);
    }

    $(document).ready(function () {
        populateDropdowns(); // Populate dropdown menus with property details

        $("#searchForm").submit(function (e) {
            e.preventDefault();
            filterProperties(); // Filter properties based on selected options
        });
    });

});
