<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . "/rest/services/UserService.php";
//$user = [
//    "name" => "John Doe",
//    "email" => "johndoe@example.com",
//    "password" => "securepassword",
//    "date_of_birth" => "1990-01-01",
//    "username" => "johndoe"
//];
$payload = $_REQUEST;
//error_log("Received payload: " . print_r($payload, true));
//echo json_encode(["debug" => $payload]);

if (empty($payload['name']) || empty($payload['password']) || empty($payload['email']) || empty($payload['username'])) {
    echo json_encode(['error' => 'Missing required fields']);
    return;
}

//$payload['password'] = password_hash($payload['password'], PASSWORD_BCRYPT);
//// Call the function with hardcoded data

$user_service = new UserService();
$added_user = $user_service->add_user($payload);

//$user_service = new UserService();
//$user = $user_service->add_user([]);
echo json_encode($added_user);
//
//if($payload['name'] == null || $payload['password'] == null || $payload['email'] == null || $payload['username'] == null) {
//    echo json_encode(['error' => 'Missing required fields']);
//    return;
//}
//
//$userService = new UserService();
//$userService->add_user([]);