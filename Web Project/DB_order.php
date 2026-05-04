<?php
header("Content-Type: text/html; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "beauty");
if ($conn->connect_error) {
    http_response_code(500);
    echo "error";
    exit;
}

$First = $conn->real_escape_string($_POST['First_Name'] ?? '');
$Last = $conn->real_escape_string($_POST['Last_Name'] ?? '');
$Email = $conn->real_escape_string($_POST['Email'] ?? '');
$Phone = $conn->real_escape_string($_POST['Phone'] ?? '');
$Address = $conn->real_escape_string($_POST['Address'] ?? '');
$City = $conn->real_escape_string($_POST['City'] ?? '');
$Zip = $conn->real_escape_string($_POST['Zip_Code'] ?? '');
$Notes = $conn->real_escape_string($_POST['Notes'] ?? '');
$PaymentMethod = $conn->real_escape_string($_POST['paymentMethod'] ?? '');
$Cardholder = $conn->real_escape_string($_POST['Cardholder_Name'] ?? '');
$CardNumber = $conn->real_escape_string($_POST['Card_Number'] ?? '');
$CardExpiry = $conn->real_escape_string($_POST['Card_Expiry'] ?? '');
$CardCvv = $conn->real_escape_string($_POST['Card_CVV'] ?? '');
$PaypalEmail = $conn->real_escape_string($_POST['PayPal_Email'] ?? '');

$paymentDetails = '';
if ($PaymentMethod === 'card') {
    $digitsOnly = preg_replace('/\D/', '', $CardNumber);
    $maskedNumber = $digitsOnly ? '**** **** **** ' . substr($digitsOnly, -4) : '';
    $paymentDetails = $maskedNumber;
} elseif ($PaymentMethod === 'paypal') {
    $paymentDetails = 'PayPal: ' . $PaypalEmail;
} else {
    $paymentDetails = 'Cash on Delivery';
}

$sql = "INSERT INTO orders (First_Name, Last_Name, Email, Phone, Address, City, Zip_Code, Notes, Payment_Method, Payment_Details, Cardholder_Name, Card_Number, Card_Expiry, Card_CVV, PayPal_Email) VALUES ('$First', '$Last', '$Email', '$Phone', '$Address', '$City', '$Zip', '$Notes', '$PaymentMethod', '$paymentDetails', '$Cardholder', '$CardNumber', '$CardExpiry', '$CardCvv', '$PaypalEmail')";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    http_response_code(500);
    echo "error";
}

$conn->close();
?>