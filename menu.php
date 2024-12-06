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
            <button id="start-game-btn">🎮 Start Game</button>
            <button onclick="viewLeaderboard()">🏆 Leaderboard</button>
            <button onclick="openSettings()">⚙️ Settings</button>
            <button style="background-color:lightcoral;" onclick="confirmLogout()">Log Out</button>
        </div>
    </div>

      <!-- Modal Popup -->
      <div id="game-mode-modal" class="modal">
        <div class="modal-content">
            <h3>Choose Game Mode</h3>
            <button class="challenge-mode" onclick="startGame('challenge')">1-Minute Challenge Mode</button>
            <button class="normal-mode" onclick="startGame('normal')">Normal Mode</button>
            <button class="cartoon-mode" onclick="startGame('cartoon')">Normal Mode (Cartoon Tiles)</button>
            <button class="close-modal" onclick="closeModal()">Cancel</button>
        </div>
    </div>

    <footer>
        <p>© 2048 Game | All Rights Reserved</p>
    </footer>
    
    <script src="frontend/js/menu.js"></script>

</body>
</html>