<?php 
session_start();
$db = require "../database.php";

if ($db->connect_error){
    die('blad polaczania z baza: '.$db->connect_error);
}
// if(isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true){
//     header("Location: index.php");
//     exit;
// }
if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])){
    $username = !empty($_POST['admin_username']) ? trim($_POST['admin_username']) : false;
    $password = !empty($_POST['admin_password']) ? trim($_POST['admin_password']) : false;
    $hashed_password = '';
    $user_id = null;
    $role_name = null;
    if($username && $password){
        $sql = "SELECT users.Id_u, users.password, roles.name AS role_name FROM `users` JOIN `roles` ON roles.Id_r = users.role_id WHERE username = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($user_id, $hashed_password, $role_name);
        $found = $stmt->fetch();
        $stmt->close();
        if($found && password_verify($password, $hashed_password) && in_array($role_name, ['admin', 'moderator'], true)){
            session_regenerate_id(true);
            $_SESSION['logged_in'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['user_id'] = $user_id;
            $_SESSION['role_name'] = $role_name;
            header("Location: index.php");
            exit;
        }
        
    }
    header("Location: adminlogin.php?error=invalid_data");
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Admin Panel</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="admin.css">

</head>
<body>

<div id="login-overlay">
  <div class="login-box">
    <div class="login-logo">Admin<span>/</span>login</div>
    <div class="login-title">Sign in</div>
    <div class="login-sub">Log in to gain full access</div>

    <form action="adminlogin.php" method="post">
        <div class="field">
          <label>Username</label>
          <input type="text" id="username" placeholder="admin" name="admin_username" autocomplete="off">
        </div>
        <div class="field">
            <label>Password</label>
            <input type="password" id="password" placeholder="••••••••" name="admin_password">
        </div>
        <input type="submit" class="btn-login" id="btn-login" name="login" value="login">
    </form>

    <div class="login-hint">
      <span>password is pretty simple</span>
    </div>
  </div>
</div>

</body>
</html>