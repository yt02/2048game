<?php
// Start session
session_start();

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

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON input
    $input = json_decode(file_get_contents("php://input"), true);
    $user = $input['username'];
    $pass = $input['password'];

    // Query to check user credentials
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verify password
        if (password_verify($pass, $row['password'])) {
            // Login successful
            $_SESSION['username'] = $user;

            
            echo json_encode(['status' => 'success', 'message' => 'Login successful']);
        } else {
            // Invalid password
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        }
    } else {
        // User not found
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

$conn->close();
?>
