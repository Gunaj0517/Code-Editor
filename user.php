<?php
session_start();

if (isset($_SESSION['name'])) {
    echo $_SESSION['name'];  // Just send the name as plain text
} else {
    echo 'user';  // Default name if not logged in
}
?>
