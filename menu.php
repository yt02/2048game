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
           <!-- Add a Start Game button -->
            <button id="start-game-btn" onclick="showModeSelection()">Start Game</button>
            <button onclick="viewLeaderboard()">🏆 Leaderboard</button>
            <button onclick="openSettings()">⚙️ Settings</button>
            <button onclick="openProfile()">🙋‍♀️ Profile 🙋‍♂️</button>
            <button style="background-color:lightcoral;" onclick="confirmLogout()">Log Out</button>
        </div>
    </div>
    

      <!-- Modal Popup -->
      <div id="mode-selection-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <h2>Select Game Mode</h2>
            <p>Choose a game mode to start playing:</p>
            <button class="normal-mode" onclick="startGame('normal')">Normal Mode 
                <img src="images/normalmode.png" alt="Easy Mode Preview" class="tooltip-image">
            </button>
            <button class="challenge-mode" onclick="startGame('challenge')">1 Minute Challenge
                <img src="images/challengemode.png" alt="Challenge Mode Preview" class="tooltip-image">
            </button>
            <button class="cartoon-mode" onclick="startGame('cartoon')">Cartoon Mode
            <img src="images/cartoonmode.png" alt="Cartoon Mode Preview" class="tooltip-image">
            </button>
            <button class="cancel-button" onclick="closeModeSelection()">Cancel</button>
        </div>
    </div>


    <footer>
        <p>© 2048 Game | All Rights Reserved</p>
    </footer>
    
    <script src="frontend/js/menu.js"></script>

</body>
</html>