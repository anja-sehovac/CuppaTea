<?php
header("Access-Control-Allow-Origin: https://cuppatea-frontend-gjxs4.ondigitalocean.app");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'vendor/autoload.php';
require 'middleware/AuthMiddleware.php';

Flight::register('auth_middleware', "AuthMiddleware");
Flight::route('/*', function() {
    if(
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0
    ) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if(Flight::auth_middleware()->verifyToken($token))
                return TRUE;
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
 });

require 'rest/routes/user_routes.php';
require 'rest/routes/category_routes.php';
require 'rest/routes/auth_routes.php';
require 'rest/routes/cart_routes.php';
require 'rest/routes/wishlist_routes.php';
require 'rest/routes/product_routes.php';
require 'rest/routes/product_view_routes.php';
require 'rest/routes/order_routes.php';
require 'rest/routes/item_in_order_routes.php';


// // Test route to verify FlightPHP is working
// Flight::route('GET /', function () {
//     echo "FlightPHP is working!";
// });

Flight::start();