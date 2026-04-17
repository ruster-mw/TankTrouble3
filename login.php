<?php
session_start();

$db = require "database.php";
if ($db->connect_error) {
    die('blad polaczania z baza: ' . $db->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = !empty($_POST['login_username']) ? trim($_POST['login_username']) : false;
    $password = !empty($_POST['login_password']) ? trim($_POST['login_password']) : false;

    if ($username && $password) {
        $sql  = "SELECT users.Id_u, users.password, roles.name AS role_name, users.login_token  
                 FROM `users` 
                 JOIN `roles` ON roles.Id_r = users.role_id 
                 WHERE username = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($user_id, $hashed_password, $role_name, $login_token);
        $found = $stmt->fetch();
        $stmt->close(); 

        if ($found && password_verify($password, $hashed_password)) {
            session_regenerate_id(true); 
            $_SESSION['logged_in'] = true;
            $_SESSION['username']  = $username;
            $_SESSION['user_id']   = $user_id;
            $_SESSION['role_name'] = $role_name;
            setcookie('login_token', $login_token, time() + 86400 * 30, '/');
            header("Location: index.php");
            exit;
        }
    }

    header("Location: index.php?error=login");
    exit;
}
?>