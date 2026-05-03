<?php
session_start();
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "beauty");

if ($conn->connect_error) {
    echo json_encode(["status" => "db_error"]);
    exit;
}

if(!isset($_POST['Email']) || !isset($_POST['Password'])) {
    echo json_encode(["status" => "missing_data"]);
    exit;
}

$Email = $_POST['Email'];
$Password = $_POST['Password'];

$sql = "SELECT * FROM users WHERE Email='$Email'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if (password_verify($Password, $user['Password'])) {
        // تخزين البيانات في Session
        $_SESSION['user'] = [
            'id' => $user['id'],
            'Name' => $user['Name'],
            'Email' => $user['Email']
        ];
        
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "wrong_password"]);
    }
} else {
    echo json_encode(["status" => "user_not_found"]);
}

$conn->close();
?>