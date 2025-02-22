<?php
require_once __DIR__ . "/BaseDao.php";

class UserDao extends BaseDao {
    public function __construct()
    {
        parent::__construct('user');
    }

    public function add_user($user)
    {
//        try {
//            $user["role_id"] = 1;
//            $query = "INSERT INTO user (name, email, password, date_of_birth, username, role_id)
//                  VALUES (:name, :email, :password, :date_of_birth, :username, :role_id)";
//            $statement = $this->connection->prepare($query);
//            $statement->execute($user);
//            $user['id'] = $this->connection->lastInsertId();
//
//            // Debugging Output
//            echo "User added successfully!";
//            return $user;
//        } catch (PDOException $e) {
//            die("SQL Error: " . $e->getMessage());
//        }
        return $this->insert('user', $user);
}}