<?php
session_start();
include("db.php");

header('Content-Type: application/json');

// Ensure the user is logged in
if (!isset($_SESSION['id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized access']);
    exit();
}

$user_id = $_SESSION['id'];

// Delete the user from the database
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    // Clear the session and redirect to login
    session_unset();
    session_destroy();
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete account']);
}

$stmt->close();
$conn->close();
?>
