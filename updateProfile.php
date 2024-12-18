<?php
session_start();
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "Guest";
// Database credentials
include("db.php");

// Get user input from POST request
$new_username = isset($_POST['username']) ? $_POST['username'] : '';
$new_email = isset($_POST['email']) ? $_POST['email'] : '';
$profile_pic = isset($_FILES['profile-pic']) ? $_FILES['profile-pic'] : '';

// Assume the user's ID is stored in a session variable (you should implement proper session handling)
//session_start();
$user_id = $_SESSION['id'];

// Update username
if ($new_username) {
    $stmt = $conn->prepare("UPDATE 2048users SET username = ? WHERE id = ?");
    $stmt->bind_param("si", $new_username, $user_id);
    $stmt->execute();
    $stmt->close();
}

// Update email
if ($new_email) {
    $stmt = $conn->prepare("UPDATE users SET email = ? WHERE id = ?");
    $stmt->bind_param("si", $new_email, $user_id);
    $stmt->execute();
    $stmt->close();
}

// Update profile picture
if ($profile_pic && $profile_pic['tmp_name']) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($profile_pic["name"]);
    move_uploaded_file($profile_pic["tmp_name"], $target_file);

    $stmt = $conn->prepare("UPDATE users SET profile_pic = ? WHERE id = ?");
    $stmt->bind_param("si", $target_file, $user_id);
    $stmt->execute();
    $stmt->close();
}

$conn->close();

// Redirect back to profile page with a success message
header("Location: profile.html?status=success");
?>
