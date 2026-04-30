<?php
header("Content-Type: text/html; charset=UTF-8");
$conn = new mysqli("localhost", "root", "", "beauty");

$Name = $_POST['Name'];
$Email = $_POST['Email'];
$Phone = $_POST['Phone'];
$Subject = $_POST['Subject'];
$Message = $_POST['Message'];

$sql = "INSERT INTO contacts (Name, Email, Phone, Subject, Message) VALUES ('$Name','$Email','$Phone','$Subject','$Message')";
if ($conn->query($sql) === TRUE) {
    echo "Done!";
} else {
    echo "Error: " . $conn->error;
}

echo "Done!";
?>