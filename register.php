<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2048users";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    $user = $input['username'];
    $email = $input['email'];
    $pass = $input['password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
        exit;
    }

    // Check for existing username or email
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $user, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username or email already exists']);
    } else {
        // Path to the default profile picture
        $defaultProfilePicture = 'images/default.png'; // Change this path if needed
        $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);

        // Insert the new user with default profile picture
        $stmt = $conn->prepare("INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $user, $email, $hashedPassword, $defaultProfilePicture);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to register user']);
        }
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

$conn->close();
?>
