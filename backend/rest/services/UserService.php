<?php

require_once "C:/xampp/htdocs/web_project/backend/rest/dao/UserDao.php";

class UserService{
    private $userDao;

    public function __construct()
    {

        $this->userDao = new UserDao();
    }

    public function add_user($user)
    {
        $user['password_signup'] = password_hash($user['password_signup'], PASSWORD_BCRYPT);
        return $this->userDao->add_user($user);
    }
}