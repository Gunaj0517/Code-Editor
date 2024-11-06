<?php
include 'db.php';

session_start(); // Start session to store user data after login

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['Username'];
    $password = $_POST['Password'];

    // Fetch user data from database
    $sql = "SELECT * FROM users WHERE username = :username";
    $stmt = $conn->prepare($sql);
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        // Store user info in session and redirect to compiler
        $_SESSION['username'] = $user['username'];
        header("Location: compiler.php"); // Redirect to the main compiler page
        exit();
    } else {
        echo "Invalid username or password!";
    }
}
?>
