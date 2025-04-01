<?php
require_once __DIR__ . "/../dao/CartDao.php";

class CartService {
    private $cartDao;

    public function __construct()
    {
        $this->cartDao = new CartDao();
    }

    public function add_to_cart($user_id, $product_id)
    {
        return $this->cartDao->add_to_cart($user_id, $product_id);
    }

    public function remove_from_cart($user_id, $product_id)
    {
        return $this->cartDao->remove_from_cart($user_id, $product_id);
    }

    public function update_quantity($user_id, $product_id, $quantity)
    {
        return $this->cartDao->update_quantity($user_id, $product_id, $quantity);
    }

    public function get_cart_by_user($user_id)
    {
        return $this->cartDao->get_cart_by_user($user_id);
    }
}