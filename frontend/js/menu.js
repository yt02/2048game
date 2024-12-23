document.addEventListener("DOMContentLoaded", () => {
    // Get the username from sessionStorage (or localStorage)
    const username = sessionStorage.getItem("username") || "Guest"; // Default to "Guest" if not set
    document.getElementById("username-display").innerText = username;
});

function showModeSelection() {
    const modal = document.getElementById('mode-selection-modal');
    modal.style.display = 'flex';
}

function closeModeSelection() {
    const modal = document.getElementById('mode-selection-modal');
    modal.style.display = 'none';
}

function hideImage(button) {
    const imageElement = button.nextElementSibling; // Get the corresponding image
    clearTimeout(hoverTimer); // Clear the timer if the mouse leaves early
    imageElement.style.display = 'none'; // Hide the image
}



// Start the game based on selected mode
function startGame(mode) {
    closeModeSelection();

    // Redirect based on game mode
    if (mode === "challenge") {
        window.location.href = "game.html?mode=challenge";
    } else if (mode === "normal") {
        window.location.href = "game.html";
    } else if (mode === "cartoon") {
        window.location.href = "game.html?mode=cartoon";
    }
}

function viewLeaderboard() {
    window.location.href = "leaderboard.html"; // Create leaderboard.html later
}

function openUserGuide() {
    window.location.href = "user_guide.html"; // Create settings.html later
}

function openProfile() {
    window.location.href = "profile.php"; // Create settings.html later
}

function navigateTo(page) {
    window.location.href = page;
}

function confirmLogout() {
    // Show a confirmation dialog
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        // Make a request to the logout PHP script
        fetch('logout.php', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Show a success message
                alert("Logout successfully!");
                // Redirect to the login page
                window.location.href = "index.html";
            } else {
                alert("Error during logout: " + data.message);
            }
        })
        .catch(error => console.error("Error:", error));
    }
}
