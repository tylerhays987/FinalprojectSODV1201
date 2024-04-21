async function createProperty(newPropertyData) {
    try {
        const response = await fetch("http://localhost:3000/properties", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPropertyData)
        })

        if (!response.ok) {
            const parsedError = await response.json()
            throw new Error(parsedError.message)
        }

        const parsedResponse = await response.json()


        if (!parsedResponse?.id) {
            alert(parsedResponse.message);
            return;
        }

        window.location.assign("index.html")
    } catch (error) {
        console.error(error)
    }

}

async function updateProperty(propertyId, newPropertyData) {
    try {
        const response = await fetch("http://localhost:3000/properties/" + propertyId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPropertyData)
        })

        if (!response.ok) {
            const parsedError = await response.json()
            throw new Error(parsedError.message)
        }

        const parsedResponse = await response.json()


        if (!parsedResponse?.id) {
            alert(parsedResponse.message);
            return;
        }

        window.location.assign("index.html")
    } catch (error) {
        console.error(error)
    }

}

async function getPropertyInfo(id) {
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

$(document).ready(async function () {
    // Function to handle property submission
    $("#propertyForm").submit(async function (e) {
        e.preventDefault();

        const currentUser = localStorage.getItem("currentUser");

        if (!currentUser) {
            throw new Error("User is not logged in")

        }

        const userInfo = JSON.parse(currentUser)

        // Retrieve propertiesData from local storage
        //const propertiesData = JSON.parse(localStorage.getItem("propertiesData"));
        //const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        const hasId = $("#propertyId").val()

        // Get form data
        const newPropertyData = {
            //id: propertiesData.properties.length + 1, // Generate a new unique ID for the property
            address: $("#address").val(),
            neighborhood: $("#neighborhood").val(),
            area: $("#area").val(),
            parking: $("#parking").val(),
            public_transportation: $("#public_transportation").val(),
            owner: userInfo.id_user,
            workspace_details: {
                [$("#workspace_type").val()]: {
                    seating_capacity: $("#seating_capacity").val(),
                    availability_date: $("#availability_date").val(),
                    lease_term: $("#lease_term").val(),
                    price: $("#price").val(),
                },
            },
        };

        if (hasId) {
            const propertyId = hasId
            await updateProperty(propertyId, newPropertyData)
        } else {
            await createProperty(newPropertyData)
        }

    });

    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('id')) {
        const property = await getPropertyInfo(searchParams.get("id"))
        console.log(property);
        if (property) {
            // Populate the create form with property data
            $("#address").val(property.address);
            $("#neighborhood").val(property.neighborhood);
            $("#area").val(property.area);
            $("#parking").val(property.parking.toLowerCase()); // Convert to lowercase
            $("#public_transportation").val(
                property.public_transportation.toLowerCase()
            ); // Convert to lowercase

            // Populate workspace details
            let workspaceDetails = property.workspace_details;
            $("#workspace_type").val(Object.keys(workspaceDetails)[0]);
            $("#seating_capacity").val(
                workspaceDetails[Object.keys(workspaceDetails)[0]].seating_capacity
            );
            $("#availability_date").val(
                workspaceDetails[Object.keys(workspaceDetails)[0]].availability_date
            );
            $("#lease_term").val(
                workspaceDetails[Object.keys(workspaceDetails)[0]].lease_term
            );
            $("#price").val(workspaceDetails[Object.keys(workspaceDetails)[0]].price);
            //TODO ESTE CAMPO NAO EXISTE
            $("#Description").val(property.Description);

            $("#propertyId").val(property.id)
        }
    }

    // Event handler for the back button click
    $("#backBtn").click(function () {
        window.location.assign('index.html')
    });

})