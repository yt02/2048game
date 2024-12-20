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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .profile-container {
            width: 100%;
            max-width: 500px;
            background:rgba(255, 255, 255, 0.58);
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            padding: 30px;
            position: relative;
        }

        .back-button {
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: #7f8c8d;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 30px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }

        .back-button:hover {
            background-color: #2c3e50;
            transform: scale(1.05);
        }

        .profile-header {
            text-align: center;
            margin-top: 40px;
        }

        .profile-header img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 15px;
            border: 4px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .profile-header h1 {
            margin: 10px 0;
            font-size: 24px;
            color: #333333;
        }

        .profile-content {
            text-align: left;
            margin-top: 20px;
        }

        .profile-content .field {
            margin-bottom: 20px;
        }

        .profile-content .field label {
            display: block;
            font-size: 14px;
            color: #555555;
            margin-bottom: 5px;
        }

        .profile-content .field input {
            width: 95%;
            padding: 12px;
            font-size: 14px;
            border: 1px solid #cccccc;
            border-radius: 5px;
            background: #f9f9f9;
        }

        .profile-content button:hover{
            
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            transform: scale(1.05);
        }

        .save-button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 14px;
            width: 100%;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .save-button:hover {
            background-color: #2980b9;
            
        }

        .cancel-button {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 14px;
            width: 100%;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }

        .cancel-button:hover {
            background-color: #c0392b;
        }

        .preview-image {
            display: none;
            margin: 15px auto;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px dashed #ccc;
        }
    </style>
</head>
<body>
    <div class="profile-container">
        <button class="back-button" onclick="window.location.href='menu.php'">Back</button>
        <div class="profile-header">
            <img id="profile-pic" src="<?= htmlspecialchars($profile_pic) ?>" alt="<?= htmlspecialchars($username) ?>'s Profile Picture">
            <h1><?= htmlspecialchars($username) ?></h1>
        </div>
        <div class="profile-content">
            <form id="profile-form" method="POST" enctype="multipart/form-data">
                <div class="field">
                    <label for="profile-pic-upload">Profile Picture</label>
                    <input type="file" id="profile-pic-upload" name="profile-pic" accept="image/*">
                    <img id="preview-pic" class="preview-image" alt="Preview">
                </div>

                <div class="field">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" value="<?= htmlspecialchars($username) ?>" placeholder="Enter your username">
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="<?= htmlspecialchars($email) ?>" placeholder="Enter your email">
                </div>

                <button type="submit" class="save-button">Save Changes</button>
                <button type="button" class="cancel-button" onclick="resetForm()">Cancel</button>
            </form>
        </div>
    </div>

    <script>
        const profilePicInput = document.getElementById('profile-pic-upload');
        const previewPic = document.getElementById('preview-pic');

        profilePicInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewPic.src = e.target.result;
                    previewPic.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        function resetForm() {
            document.getElementById('profile-form').reset();
            previewPic.style.display = 'none';
            previewPic.src = "";
        }

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
    </script>
</body>
</html>

