<?php
session_start();
header('Content-Type: text/plain');

$conn = new mysqli("localhost", "root", "", "beauty");

if ($conn->connect_error) {
    echo "db_error";
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo "not_logged";
    exit;
}

$user_id = $_SESSION['user_id'];
$Name = $_POST['Name'];
$Email = $_POST['Email'];

// التحقق من عدم وجود الإيميل المستخدم من قبل شخص آخر
$check = $conn->query("SELECT * FROM users WHERE Email='$Email' AND id != $user_id");
if ($check && $check->num_rows > 0) {
    echo "email_taken";
    exit;
}

$sql = "UPDATE users SET Name='$Name', Email='$Email' WHERE id=$user_id";

if ($conn->query($sql) === TRUE) {
    // تحديث Session
    $_SESSION['user_name'] = $Name;
    $_SESSION['user_email'] = $Email;
    echo "success";
} else {
    echo "error: " . $conn->error;
}

$conn->close();
?>