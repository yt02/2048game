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

// Fetch leaderboard data
$result = $conn->query("SELECT username, score FROM leaderboard ORDER BY score DESC LIMIT 10");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $data]);

$conn->close();
?>
