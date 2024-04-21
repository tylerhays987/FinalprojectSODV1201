async function getProperties(filters = undefined) {
  try {
    let urlFilters;
    /*
    if(filters) {
      //iterar os fitros
      adicionar os filtros usando   new URLSearchParams({
          foo: 'value',
          bar: 2,
      }))

      urlFilters = new URLSearchParams(filtro)
    }
    
    */
    const url = urlFilters ?
      `http://localhost:3000/properties?${urlFilters}`
      :
      'http://localhost:3000/properties'

    const response = await fetch(url)

    if (!response.ok) {
      const parsedError = await response.json()
      alert(parsedError.message)
      return
    }

    const propertiesList = await response.json()

    return propertiesList
  } catch (error) {
    console.error(error)
  }
}

async function getPropertyReservationInfo(id) {
  try {
    const response = await fetch(`http://localhost:3000/property/${id}`)

    if (!response.ok) {
      const parsedError = await response.json()
      alert(parsedError.message)
      return
    }

    const propertyInfo = await response.json()

    return propertyInfo
  } catch (error) {
    console.error(error)
  }
}

async function deleteProperty(id) {
  try {
    const response = await fetch(`http://localhost:3000/properties/${id}`, {
      method: "DELETE"
    })

    if (!response.ok) {
      const parsedError = await response.json()
      alert(parsedError.message)
      return
    }

    const deletionResult = await response.json()

    return deletionResult.message
  } catch (error) {
    console.error(error)
  }
}

async function bookWorkspace(bookingData) {
  try {
    const response = await fetch(`http://localhost:3000/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData)
    })

    if (!response.ok) {
      const parsedError = await response.json()
      alert(parsedError.message)
      return
    }

    const bookingResult = await response.json()

    return bookingResult
  } catch (error) {
    console.error(error)
  }
}



$(document).ready(function () {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    const logoutFeature = $('.logout-fn')
    logoutFeature.show()
    const userInfo = JSON.parse(currentUser)

    if (userInfo.role === "owner") {
      populateOwnerListings(userInfo);
    } else if (userInfo.role === "coworker") {
      populateCoworkerListings(userInfo);
    }
  }

  // Function to show the create form section and hide the listings section
  function showCreateForm(propertyId = undefined) {
    if (propertyId) {
      window.location.assign(`propertyRegistration.html?id=${propertyId}`)
    } else {
      window.location.assign("propertyRegistration.html")
    }
  }

  // Function to populate property listings for owners
  async function populateOwnerListings(currentUser) {
    let ownerListingsContainer = $("#listingsSection");
    ownerListingsContainer.empty();

    // Fetch and parse properties data from local storage
    const propertiesList = await getProperties();

    propertiesList.forEach((property) => {

      if (property.owner == currentUser.id_user) {
        // Changed ownerId to userId for consistency
        ownerListingsContainer.append(`
                    <div id="ownerListings">
                        <span>${property.address}</span>
                        <br>
                        <button class="editPropertyBtn" data-property-id="${property.id}">Edit</button>
                        <button class="deletePropertyBtn" data-property-id="${property.id}">Delete</button>
                    </div>`);
      }
    });

    // Show the listings section with data added
    $("#listingsSection").show(); // Patricia - display updated listing after addition of new property
    $(".owner").show()

    // Hide the create form section
    $("#createFormSection").hide(); // Patricia - hide form of property addition


  }

  // Function to populate property listings for coworkers
  async function populateCoworkerListings() {
    let coworkerListingsContainer = $(".coworkerListings");
    coworkerListingsContainer.empty();

    const propertiesList = await getProperties();

    propertiesList.forEach((property) => {
      let propertyDetailsHtml = `
        <div id="coworkerListings">
            <p>Address: ${property.address}</p>
            <p>Neighborhood: ${property.neighborhood}</p>
            <p>Area: ${property.area} sq. ft.</p>
            <p>Parking: ${property.parking}</p>
            <p>Public Transportation: ${property.public_transportation}</p>
            <p>Workspace Details:</p>
            <ul>
                ${property.workspace_details
          ?.map((workspace) => {
            return `<li>${workspace.type
              .split("_")
              .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(" ")} - Capacity: ${workspace.seating_capacity
              }, Price: $${workspace.price}</li>`;
          })
          .join("")}
                
            </ul>
            <button class="reservePropertyBtn" data-property-id="${property.id
        }">Reserve</button>
        </div>`;
      coworkerListingsContainer.append(propertyDetailsHtml);
    });

    $(".coworker").show()
  }

  // function search() {
  //   const searchBar = document.getElementById("searchBar").value;

  //   // Fetch properties data from local storage
  //   propertiesData = JSON.parse(localStorage.getItem("propertiesData"));

  //   // Filter properties based on the search input
  //   let results = propertiesData.filter((property) =>
  //     property.address.toLowerCase().includes(searchBar.toLowerCase())
  //   );

  //   // Display search results
  //   const searchResultsList = document.getElementById("searchResultsList");
  //   searchResultsList.innerHTML = "";

  //   results.forEach((property) => {
  //     const li = document.createElement("li");
  //     li.textContent = `${property.address}`;

  //     // Create the "View More" button and add an onclick event
  //     const viewMore = document.createElement("button");
  //     viewMore.textContent = "View More";
  //     viewMore.onclick = () => fetchProperty(property.id); // Assuming fetchProperty is a function to get more details

  //     li.appendChild(viewMore);
  //     searchResultsList.appendChild(li);
  //   });
  // }

  $(document).on("click", ".reservePropertyBtn", async function () {

    const propertyId = $(this).data("property-id");

    const property = await getPropertyReservationInfo(propertyId)

    if (property) {
      // Populate property details in the reservation section
      $("#propertyName").text(property.address);
      $("#propertyDescription").text(property.Description);
      $("#propertyId").val(property.id)

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
  $("#cancelReservationBtn, #backBtnBook").click(
    handleCancelBackButtons_Booking
  );
  // Patricia - end

  // Event handler for the reservation form submission
  $("#reservationForm").submit(async function (e) {
    e.preventDefault();
    // Logic to handle reservation submission goes here

    const newBooking = {
      id_user: currentUser.id_user,
      id_property: $("#propertyId").val(),
      date: $("#reservationDate").val(),
      start_time: $("#startTime").val(),
      end_time: $("#endTime").val(),
    };

    const result = await bookWorkspace(newBooking)

    $("#ownerContact").html(`
            <h2><strong> To book a space, please contact directly the owner through: </strong></h2>
            <p><strong>Owner: ${result.name} </strong></p>
            <p><strong>Phone: ${result.phone}</strong></p>
            <p><strong>Email:</strong> <a href="mailto:${result.email}" style="color: blue; text-decoration: none;">${result.email}</a></p>
        `);
  });


  // Event handler for the back button click
  $("#backBtn").click(function () {
    window.location.assign('index.html')
  });

  // Event handler for the "Create New Listing" button click
  $(".ownerListingNav button").click(function () {
    showCreateForm();
  });

  // Event handler for edit property button click
  $(document).on("click", ".editPropertyBtn", async function () {
    const propertyId = $(this).data("property-id");
    showCreateForm(propertyId);

  });

  // Event handler for the delete button click
  $(document).on("click", ".deletePropertyBtn", async function (e) {
    e.preventDefault();
    const propertyId = $(this).data("property-id");
    await deleteProperty(propertyId);
    window.location.assign('index.html')
  });


  // Filter properties based on selected options
  let filterProperties = () => {
    propertiesData = JSON.parse(localStorage.getItem("propertiesData"));

    if (!propertiesData || propertiesData.properties.length === 0) {
      console.error("Error: No properties data available.");
      alert("Error: No properties data available");
      return;
    }

    let filteredProperties = propertiesData.properties.filter((property) => {
      let selectedSeats = $("#seatsDropdown").val();
      let selectedPrice = $("#priceDropdown").val();
      let selectedSqft = $("#sqftDropdown").val();

      return (
        (selectedSeats === "placeholder" ||
          property.workspace_details.meeting_room.seating_capacity ==
          selectedSeats ||
          property.workspace_details.private_office.seating_capacity ==
          selectedSeats ||
          property.workspace_details.open_desk.seating_capacity ==
          selectedSeats) &&
        (selectedPrice === "placeholder" ||
          property.workspace_details.meeting_room.price == selectedPrice ||
          property.workspace_details.private_office.price == selectedPrice ||
          property.workspace_details.open_desk.price == selectedPrice) &&
        (selectedSqft === "placeholder" || property.area == selectedSqft)
      );
    });

    // Display filtered properties (you can customize this according to your needs)
    console.log("Filtered Properties:", filteredProperties);
  };

  //populateDropdowns(); // Populate dropdown menus with property details

  $("#searchForm").submit(function (e) {
    e.preventDefault();
    filterProperties(); // Filter properties based on selected options
  });
});
