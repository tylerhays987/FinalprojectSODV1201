async function loginUser(email, password) {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            const parsedError = await response.json()
            throw new Error(parsedError.message)
        }

        const parsedResponse = await response.json()


        if (!parsedResponse.user) {
            alert(parsedResponse.message);
            return;
        }

        console.log("User logged in:", parsedResponse.user);
        const { user } = parsedResponse

        //Save the user data in local storage
        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.assign("index.html")
    } catch (error) {
        console.error(error)
    }

}

async function registerUser(newUserData) {
    try {
        const response = await fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserData)
        })

        if (!response.ok) {
            const parsedError = await response.json()
            throw new Error(parsedError.message)
        }

        const parsedResponse = await response.json()
        if (parsedResponse.id) {
            await loginUser(newUserData.email, newUserData.password)
            return
        }

        throw new Error("User registration error")
    } catch (error) {
        console.error(error)
    }

}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.assign("index.html")
}

$(document).ready(function () {

    $("#loginForm").submit(async function (e) {
        e.preventDefault();
        try {
            const email = $("#loginEmail").val();
            const password = $("#loginPassword").val();

            if (!email || !password) {
                alert("Email and password are required!")
                return
            }

            await loginUser(email, password)

        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    });

    $("#signupForm").submit(async function (e) {
        e.preventDefault();
        const newUser = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            role: $("#role").val(),
        };
        console.log(newUser);
        await registerUser(newUser)
    });
})

$(".backBtn").click(function () {
    window.location.assign('index.html')
  });
