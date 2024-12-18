<?php
// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2048users";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

// Get leaderboard type from query parameter 
$type = isset($_GET['type']) ? $_GET['type'] : 'leaderboard'; 
$valid_types = ['leaderboard', 'challenge_leaderboard', 'cartoon_leaderboard']; 

if (!in_array($type, $valid_types)){ 
    die(json_encode(['status' => 'error', 'message' => 'Invalid leaderboard type']));
}

// Fetch leaderboard data
$result = $conn->query("SELECT username, score FROM $type ORDER BY score DESC LIMIT 10");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $data]);

$conn->close();
?>
