<?php
session_start();

// Clear the current session data
session_unset();
session_destroy();

// Optionally, start a new session for the "Guest" username
session_start();
$_SESSION['username'] = "Guest";

// Respond with a success status
echo json_encode(['status' => 'success']);
exit;
?>
