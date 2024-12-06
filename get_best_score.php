<?php
header('Content-Type: application/json');

// Start session and validate user
session_start();
if (!isset($_SESSION['username'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit;
}

$username = $_SESSION['username'];

// Check if the user is a guest
if ($username === 'Guest') {
    echo json_encode(['status' => 'guest', 'best_score' => 0]); // Guest user has a default score of 0
    exit;
}

// Database connection
try {
    // Replace with your actual database credentials
    $db = new PDO('mysql:host=localhost;dbname=2048users', 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Query to get the best score for the user from the leaderboard table
try {
    // Query to fetch the highest score for the current user
    $query = $db->prepare("SELECT MAX(score) AS best_score FROM leaderboard WHERE username = ?");
    $query->execute([$username]);
    $result = $query->fetch(PDO::FETCH_ASSOC);

    if ($result && $result['best_score'] !== null) {
        echo json_encode(['status' => 'success', 'best_score' => (int)$result['best_score']]);
    } else {
        // If no score is found for the user, return a default score of 0
        echo json_encode(['status' => 'success', 'best_score' => 0]);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . $e->getMessage()]);
}
