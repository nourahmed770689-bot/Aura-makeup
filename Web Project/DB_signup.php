<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "beauty");

if ($conn->connect_error) {
    die("DB_CONNECTION_ERROR: " . $conn->connect_error);
}

// التحقق من وجود البيانات
if(!isset($_POST['Name']) || !isset($_POST['Email']) || !isset($_POST['Password'])) {
    die("MISSING_DATA");
}

$Name = $_POST['Name'];
$Email = $_POST['Email'];
$Password = $_POST['Password'];

// التحقق من عدم وجود إيميل مكرر
$check = $conn->query("SELECT * FROM users WHERE Email='$Email'");
if($check && $check->num_rows > 0) {
    echo "EMAIL_EXISTS";
    $conn->close();
    exit;
}

$hashed_password = password_hash($Password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (Name, Email, Password) VALUES ('$Name', '$Email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "SQL_ERROR: " . $conn->error;
}

$conn->close();
?>