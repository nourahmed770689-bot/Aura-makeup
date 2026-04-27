<?php
$conn = new mysqli("localhost", "root", "", "beauty");

$name = $_POST['name'];
$email = $_POST['email'];

$sql = "INSERT INTO users (name, email) VALUES ('$name','$email')";
$conn->query($sql);

echo "Done!";
?>