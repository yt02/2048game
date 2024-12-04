<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit;
}

$username = $_SESSION['username'];

// Check if the 'score' is set in the POST request
if (!isset($_POST['score'])) {
    echo json_encode(['status' => 'error', 'message' => 'Score parameter is missing']);
    exit;
}

$score = $_POST['score']; // Get the score from the POST request

// Database connection
try {
    // Replace with your actual database credentials
    $db = new PDO('mysql:host=localhost;dbname=2048users', 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Insert new score into the leaderboard
try {
    // Insert the score into the leaderboard table
    $query = $db->prepare("INSERT INTO leaderboard (username, score) VALUES (?, ?)");
    $query->execute([$username, $score]);

    echo json_encode(['status' => 'success', 'message' => 'Score saved successfully']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>
