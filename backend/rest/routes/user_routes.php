<?php

require_once __DIR__ . '/../services/UserService.php';

Flight::set('user_service', new UserService());

Flight::group('/users', function() {

    Flight::route('POST /add', function() {
        $data = Flight::request()->data->getData();

        if (!isset($data['signup_email']) || !isset($data['password_signup']) || !isset($data['repeat_password_signup'])) {
            Flight::halt(400, 'Email, password and repeat password are required.');
        }

        if ($data['password_signup'] !== $data['repeat_password_signup']) {
            Flight::halt(400, 'Password and repeat password do not match');
        }

        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        unset($data['repeat_password_signup']);

        $user = Flight::get('user_service')->add_user($data);

        Flight::json(
            $user
        );
    });

});