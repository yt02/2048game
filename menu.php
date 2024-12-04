<?php
session_start(); // Start session
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "Guest";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2048 Menu</title>
    <link rel="stylesheet" href="frontend/css/menu.css"> <!-- External CSS file -->
</head>
<body>
    <div id="menu-wrapper">
        <h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>
        <div id="menu-container">
            <button onclick="startGame()">🎮 Start Game</button>
            <button onclick="viewLeaderboard()">🏆 Leaderboard</button>
            <button onclick="openSettings()">⚙️ Settings</button>
        </div>
    </div>

    <footer>
        <p>© 2048 Game | All Rights Reserved</p>
    </footer>

    <script src="frontend/js/menu.js"></script>
</body>
</html>
