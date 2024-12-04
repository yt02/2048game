<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = '2048users';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch the leaderboard (top 10 scores)
    $stmt = $pdo->prepare("SELECT username, MAX(score) as best_score FROM leaderboard GROUP BY username ORDER BY best_score DESC LIMIT 10");
    $stmt->execute();
    $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'leaderboard' => $leaderboard]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
