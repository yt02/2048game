document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Send data to PHP script
    const response = await fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    // Handle response
    if (result.status === "success") {
        alert(result.message);
        // Redirect or take action on successful login
        window.location.href = "menu.html"; // Example redirection
    } else {
        alert(result.message);
    }
});

function playAsGuest() {
    alert("Playing as guest...");
    window.location.href = "game.html"; // Example guest play redirection
}
let username = "Guest"; // Default username

// Fetch the logged-in username
fetch('get_username.php')
    .then(response => response.json())
    .then(data => {
        username = data.username;
        console.log("Logged-in username:", username);
    })
    .catch(error => console.error("Error fetching username:", error));

