<?php 
// $host = "sql100.infinityfree.com";
// $dbname = "if0_41631541_tank_trouble3"; 
// $username = "if0_41631541";
// $password = "Fenix2137";
$host = "localhost";
$dbname = "tank-trouble3"; 
$username = "root";
$password = "";

$db = new mysqli($host, $username, $password, $dbname);

return $db;
?>