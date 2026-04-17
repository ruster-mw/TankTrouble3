<?php
session_start();
require_once 'database.php'; 

if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}

$userId = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = !empty($_POST['new_username_username']) ? trim($_POST['new_username_username']) : false;
    $password = !empty($_POST['new_username_password']) ? trim($_POST['new_username_password']) : false;

    if ($username && $password) {
        $sql  = "SELECT password FROM `users` WHERE Id_u = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->bind_result($hashed_password);
        $found = $stmt->fetch();
        $stmt->close(); 

        if ($found && password_verify($password, $hashed_password)) {
            $update_stmt = $db->prepare("UPDATE `users` SET username = ? WHERE Id_u = ?");
            $update_stmt->bind_param("si", $username, $userId);
            $success = $update_stmt->execute();
            $update_stmt->close();

            if ($success) {
                $_SESSION['username'] = $username;
                header("Location: index.php?success=username");
                exit;
            }
        }
    }

    header("Location: index.php?error=username");
    exit;
}
?>