<?php
header("Content-Type: text/html; charset=UTF-8");
$conn = new mysqli("localhost", "root", "", "beauty");

$First= $_POST['First_Name'];
$Last = $_POST['Last_Name'];
$Email = $_POST['Email'];
$Phone = $_POST['Phone'];
$Address = $_POST['Address'];
$City = $_POST['City'];
$Zip = $_POST['Zip_Code'];
$Notes = $_POST['Notes'];

$sql = "INSERT INTO orders (First_Name, Last_Name, Email, Phone, Address, City, Zip_Code, Notes) VALUES ('$First','$Last','$Email','$Phone','$Address','$City','$Zip','$Notes')";
if ($conn->query($sql) === TRUE) {
    echo "Done!";
} else {
    echo "Error: " . $conn->error;
}

echo "Order placed successfully!";
?>