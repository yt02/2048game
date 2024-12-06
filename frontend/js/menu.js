document.addEventListener("DOMContentLoaded", () => {
    // Get the username from sessionStorage (or localStorage)
    const username = sessionStorage.getItem("username") || "Guest"; // Default to "Guest" if not set
    document.getElementById("username-display").innerText = username;
});

const modal = document.getElementById("game-mode-modal");
        const startGameBtn = document.getElementById("start-game-btn");

        // Open the modal
        startGameBtn.addEventListener("click", function () {
            modal.style.display = "flex";
        });

        // Close the modal
        function closeModal() {
            modal.style.display = "none";
        }

        // Start the game based on selected mode
        function startGame(mode) {
            closeModal();

            // Redirect based on game mode
            if (mode === "challenge") {
                window.location.href = "game.php?mode=challenge";
            } else if (mode === "normal") {
                window.location.href = "game.html";
            } else if (mode === "cartoon") {
                window.location.href = "game.php?mode=cartoon";
            }
        }

function viewLeaderboard() {
    window.location.href = "leaderboard.html"; // Create leaderboard.html later
}

function openSettings() {
    window.location.href = "settings.html"; // Create settings.html later
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
