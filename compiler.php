<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: loginPage.html"); // Redirect to login if not logged in
    exit();
}

echo "Welcome, " . htmlspecialchars($_SESSION['username']) . "!";
?>
