<?php
header("Content-Type: text/html; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "beauty");

// تأكد من الاتصال
if ($conn->connect_error) {
    die("DB_ERROR");
}

// حماية بسيطة من undefined index
$Name = $_POST['Name'] ?? '';
$Email = $_POST['Email'] ?? '';
$Phone = $_POST['Phone'] ?? '';
$Subject = $_POST['Subject'] ?? '';
$Message = $_POST['Message'] ?? '';

// SQL
$sql = "INSERT INTO contacts (Name, Email, Phone, Subject, Message)
VALUES ('$Name','$Email','$Phone','$Subject','$Message')";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "error";
}

$conn->close();
?>