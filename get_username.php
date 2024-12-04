<?php
session_start();

// Check if the username is set in the session
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "Guest";

// Return the username as a JSON response
echo json_encode(['username' => $username]);
?>
