<?php
require_once 'db.php'; // Include your database connection script

$mode = $_GET['mode'];

// Determine the leaderboard table based on mode
$table = '';
if ($mode === 'normal') {
    $table = 'leaderboard';
} elseif ($mode === 'challenge') {
    $table = 'challenge_leaderboard';
} elseif ($mode === 'cartoon') {
    $table = 'cartoon_leaderboard';
}

// Fetch leaderboard data
$sql = "SELECT username, score FROM $table ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$leaderboard = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $leaderboard[] = $row;
    }
}

$conn->close();

echo json_encode($leaderboard);
?>
