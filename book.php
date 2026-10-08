<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No booking information received."
    ]);
    exit;
}

$fullName = trim($data["fullName"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$checkIn = $data["checkIn"] ?? "";
$checkOut = $data["checkOut"] ?? "";
$room = $data["room"] ?? "";
$adults = $data["adults"] ?? "";
$children = $data["children"] ?? "0";
$specialRequests = trim($data["specialRequests"] ?? "");

if (
    empty($fullName) ||
    empty($email) ||
    empty($phone) ||
    empty($checkIn) ||
    empty($checkOut) ||
    empty($room)
) {
    echo json_encode([
        "success" => false,
        "message" => "Please complete all required fields."
    ]);
    exit;
}


/*
 * Save booking information into a text file.
 * This is useful for demonstrating backend
 * data handling without requiring a database.
 */

$booking = [
    "Full Name" => $fullName,
    "Email" => $email,
    "Phone" => $phone,
    "Check-In" => $checkIn,
    "Check-Out" => $checkOut,
    "Room" => $room,
    "Adults" => $adults,
    "Children" => $children,
    "Special Requests" => $specialRequests,
    "Submitted At" => date("Y-m-d H:i:s")
];

$file = "bookings.txt";

$bookingText = "-----------------------------\n";

foreach ($booking as $key => $value) {
    $bookingText .= $key . ": " . $value . "\n";
}

$bookingText .= "-----------------------------\n\n";

file_put_contents($file, $bookingText, FILE_APPEND);

echo json_encode([
    "success" => true,
    "message" => "Booking submitted successfully."
]);

?>