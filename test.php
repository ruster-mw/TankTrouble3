<?php
$host = "sql100.infinityfree.com";
$dbname = "if0_41631541_tank_trouble3"; // your full DB name
$username = "if0_41631541";
$password = "Fenix2137";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully!";
?>
