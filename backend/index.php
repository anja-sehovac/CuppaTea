<?php

require 'vendor/autoload.php';
require 'rest/routes/user_routes.php';

// Test route to verify FlightPHP is working
Flight::route('GET /test', function () {
    echo "FlightPHP is working!";
});

Flight::start();