<?php
$servername = "localhost"; // Server name (default for XAMPP is localhost)
$username = "root";        // Database username (default for XAMPP is root)
$password = "";            // Database password (default for XAMPP is empty)
$dbname = "2048users";     // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
