document.addEventListener("DOMContentLoaded", () => {
    // Get the username from sessionStorage (or localStorage)
    const username = sessionStorage.getItem("username") || "Guest"; // Default to "Guest" if not set
    document.getElementById("username-display").innerText = username;
});

function startGame() {
    window.location.href = "game.html";
}

function viewLeaderboard() {
    window.location.href = "leaderboard.html"; // Create leaderboard.html later
}

function openSettings() {
    window.location.href = "settings.html"; // Create settings.html later
}
