<?php
header("Content-Type: text/html; charset=UTF-8");
$conn = new mysqli("localhost", "root", "", "beauty");

$Email = $_POST['Email'];
$Created_At = date('Y-m-d H:i:s'); // الوقت الحالي

$sql = "INSERT INTO subscribers (Email, Created_At) VALUES ('$Email', '$Created_At')";
if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "error";
}

?>