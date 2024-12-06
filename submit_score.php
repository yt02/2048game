<?php
session_start();
require_once 'db.php'; // Include your database connection script

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

$mode = $data['mode'];
$score = $data['score'];

// Check if the user is logged in
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username']; // Retrieve the logged-in username from session
} else {
    // If no user is logged in, do not save the score
    echo json_encode([
        'success' => false,
        'error' => 'User not logged in. Scores cannot be saved for guests.'
    ]);
    exit; // Stop further execution
}
// Determine the leaderboard table based on mode
$table = '';
if ($mode === 'normal') {
    $table = 'leaderboard';
} elseif ($mode === 'challenge') {
    $table = 'challenge_leaderboard';
} elseif ($mode === 'cartoon') {
    $table = 'cartoon_leaderboard';
}

// Insert score into the appropriate table
$sql = "INSERT INTO $table (username, score) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $username, $score);

$response = [];
if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
