<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:8000');
header('Access-Control-Allow-Credentials: true');
if (isset($_SESSION['name'])) {
    echo $_SESSION['name'];  // Just send the name as plain text
} else {
    echo 'USER';  // Default name if not logged in
}
?>
