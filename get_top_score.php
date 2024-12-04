<?php
header('Content-Type: application/json');

// Database connection
try {
    // Replace with your actual database credentials
    $db = new PDO('mysql:host=localhost;dbname=2048users', 'root', '');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Query to fetch the top 20 scores from the leaderboard
try {
    $query = $db->prepare("SELECT username, score FROM leaderboard ORDER BY score DESC LIMIT 20");
    $query->execute();
    $top_scores = $query->fetchAll(PDO::FETCH_ASSOC);

    if ($top_scores) {
        echo json_encode(['status' => 'success', 'leaderboard' => $top_scores]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No scores found']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . $e->getMessage()]);
}
?>
