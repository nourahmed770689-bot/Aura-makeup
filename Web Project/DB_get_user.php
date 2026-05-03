<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user'])) {
    echo json_encode([
        "status" => "logged_in",
        "Name" => $_SESSION['user']['Name'],
        "Email" => $_SESSION['user']['Email']
    ]);
} else {
    echo json_encode(["status" => "not_logged"]);
}
?>