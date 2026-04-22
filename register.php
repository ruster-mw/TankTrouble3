<?php
session_start();

$db = require "database.php";
if ($db->connect_error) {
    die('blad polaczania z baza: ' . $db->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = !empty($_POST['signup_username']) ? trim($_POST['signup_username']) : false;
    $password = !empty($_POST['signup_password']) ? trim($_POST['signup_password']) : false;
    $email    = !empty($_POST['signup_email']) && filter_var($_POST['signup_email'], FILTER_VALIDATE_EMAIL) ? trim($_POST['signup_email']) : false;

    if ($username && $password && $email) {
        $check = $db->prepare("SELECT username FROM users WHERE username = ? OR email = ?");
        $check->bind_param("ss", $username, $email);
        $check->execute();
        $check->store_result();
        $taken = $check->num_rows > 0;
        $check->close();

        if ($taken) {
            $_SESSION['flash-signed-up'] = 'error-username';
            header("Location: index.php");
            exit;
        }
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        require_once './admin/user.php';
        $user_object = new User($db);
        $user_object->insert($username, $password, $email, 2);
        $_SESSION['flash-signed-up'] = 'success';
        header("Location: index.php");
        exit;
    }
    $_SESSION['flash-signed-up'] = 'error';
    header("Location: index.php");
    exit;
}
?>