<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'vendor/autoload.php';
require 'rest/routes/user_routes.php';
require 'rest/routes/auth_routes.php';
require 'rest/routes/middleware_routes.php';

// Test route to verify FlightPHP is working
Flight::route('GET /', function () {
    echo "FlightPHP is working!";
});

Flight::start();