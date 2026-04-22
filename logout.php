<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_unset();
    session_destroy();
    setcookie('login_token', '', time() - 3600, '/');
}
header("Location: index.php");
exit;
?>