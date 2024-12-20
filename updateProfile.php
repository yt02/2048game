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

header('Content-Type: application/json'); // Set the response type to JSON
$response = ['status' => 'success'];

if ($new_username) {
    $stmt = $conn->prepare("UPDATE users SET username = ? WHERE id = ?");
    $_SESSION['username'] = $new_username;
    $stmt->bind_param("si", $new_username, $user_id);
    $stmt->execute();
    $stmt->close();
    $response['updated_username'] = $new_username;
}

if ($new_email) {
    $stmt = $conn->prepare("UPDATE users SET email = ? WHERE id = ?");
    $stmt->bind_param("si", $new_email, $user_id);
    $stmt->execute();
    $stmt->close();
    $response['updated_email'] = $new_email;
}

if ($profile_pic && $profile_pic['tmp_name']) {
    $target_dir = "images/";
    $target_file = $target_dir . basename($profile_pic["name"]);
    move_uploaded_file($profile_pic["tmp_name"], $target_file);

    $stmt = $conn->prepare("UPDATE users SET profile_picture = ? WHERE id = ?");
    $stmt->bind_param("si", $target_file, $user_id);
    $stmt->execute();
    $stmt->close();
    $response['updated_profile_pic'] = $target_file;
}

$conn->close();
echo json_encode($response); // Send the JSON response
exit();


// Redirect back to profile page with a success message

?>
