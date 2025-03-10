<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . "/../../config.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}


Flight::route('/*', function(){
    $req_method = Flight::request()->method;
    $req_url = Flight::request()->url;
    if($req_method == 'POST' && $req_url == "/add"){
        return TRUE;
    }
    if($req_method == 'GET' && $req_url == "/current"){
        return TRUE;
    }
    if($req_method == 'GET' && $req_url == "/register"){
        return TRUE;
    }
    if($req_method == 'POST' && $req_url == "/user"){
        return TRUE;
    }
    try{
        $token = Flight::request()->getHeader('Authentication');
        if(!$token){
            Flight::halt(401, 'Token not provided');
        }
        $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));

//        Flight::set('user', $decoded_token->user->id);
//        Flight::set('jwt_token', $token);
        return TRUE;
    } catch(Exception $e){
        Flight::halt(401, $e->getMessage());
    }
});