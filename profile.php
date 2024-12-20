<?php
session_start();
include("db.php");

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php"); // Redirect to login if not logged in
    exit();
}

if (!isset($_SESSION['id'])) {
    header("Location: login1.html"); // Redirect to login page if not logged in
    exit();
}

$user_id = $_SESSION['id'];
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "Guest";

// Fetch user data
$stmt = $conn->prepare("SELECT username, email, profile_picture FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($username, $email, $profile_pic);
$stmt->fetch();
$stmt->close();

// Set default values if profile picture is not set
$profile_pic = $profile_pic ?: "images/defaultpic.png";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: #f7f9fc;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .profile-container {
            width: 100%;
            max-width: 600px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }

        .profile-header {
            background: linear-gradient(135deg, #3498db, #8e44ad);
            color: white;
            padding: 20px;
            text-align: center;
        }

        .profile-header img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 4px solid white;
            margin-top: -60px;
            object-fit: cover;
        }

        .profile-header h1 {
            margin: 10px 0;
            font-size: 24px;
        }

        .profile-content {
            padding: 20px;
        }

        .profile-content .field {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .profile-content .field label {
            font-size: 16px;
            font-weight: bold;
        }

        .profile-content .field span {
            font-size: 16px;
            color: #555;
        }

        .profile-content .field input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            display: none;
        }

        .edit-button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
        }

        .edit-button:hover {
            background-color: #2980b9;
        }

        .save-button {
            background-color: #2ecc71;
            color: white;
            border: none;
            padding: 10px;
            width: 100%;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-top: 20px;
        }

        .save-button:hover {
            background-color: #27ae60;
        }

        .back-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #bdc3c7;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-bottom: 20px;
        }

        .back-button:hover {
            background-color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <div class="profile-header">
            <img id="profile-pic" src="<?= htmlspecialchars($profile_pic) ?>" alt="Profile Picture">
            <h1><?= htmlspecialchars($username) ?></h1>
        </div>
        <div class="profile-content">
            <form id="profile-form" method="POST" enctype="multipart/form-data">
                <div class="field">
                    <label for="profile-pic-upload">Profile Picture</label>
                    <span><button type="button" class="edit-button" onclick="enableEditing('profile-pic-upload')">Change</button></span>
                    <input type="file" id="profile-pic-upload" name="profile-pic" accept="images/default.png">
                </div>

                <div class="field">
                    <label for="username">Username</label>
                    <span id="username-display"><?= htmlspecialchars($username) ?></span>
                    <input type="text" id="username" name="username">
                    <button type="button" class="edit-button" onclick="enableEditing('username')">Edit</button>
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <span id="email-display"><?= htmlspecialchars($email) ?></span>
                    <input type="email" id="email" name="email">
                    <button type="button" class="edit-button" onclick="enableEditing('email')">Edit</button>
                </div>

                <button type="submit" class="save-button">Save Changes</button>
            </form>
        </div>
    </div>

    <script>
        document.getElementById('profile-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch('updateProfile.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Profile updated successfully!');
                    window.location.reload();
                } else {
                    alert('Error updating profile: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating the profile.');
            });
        });

        function enableEditing(id) {
            const input = document.getElementById(id);
            input.style.display = 'block';
        }
    </script>
</body>
</html>
