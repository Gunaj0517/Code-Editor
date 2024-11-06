<?php
$servername = "localhost";
$username = "root";
$password = getenv('DB_PASSWORD');
$dbname = "code_compiler_db";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
