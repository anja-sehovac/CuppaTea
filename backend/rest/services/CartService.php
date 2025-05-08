<?php
require_once __DIR__ . "/../dao/CartDao.php";

class CartService {
    private $cartDao;

    public function __construct()
    {
        $this->cartDao = new cartDao();
    }

    public function add_to_cart($user_id, $product_id)
    {
        if (empty($user_id)) return "Server error";
        if (empty($product_id)) return "Invalid input";

        
        return $this->cartDao->add_to_cart($user_id, $product_id);
    }

    public function remove_from_cart($user_id, $product_id)
    {
        if (empty($user_id)) return "Server error";
        if (empty($product_id)) return "Invalid input";

        return $this->cartDao->remove_from_cart($user_id, $product_id);
    }

    public function update_quantity($user_id, $product_id, $quantity)
    {
        if (empty($user_id)) return "Server error";
        if (empty($product_id) || $quantity === null) return "Invalid input";

        return $this->cartDao->update_quantity($user_id, $product_id, $quantity);
    }

    public function get_cart_by_user($user_id)
    {
        if (empty($user_id)) return "Server error";

        return $this->cartDao->get_cart_by_user($user_id);
    }

    public function get_filtered_cart($user_id, $search = "", $sort_by = "name", $sort_order = "asc")
    {
        if (empty($user_id)) return "Server error";

        return $this->cartDao->get_cart_by_user($user_id, $search, $sort_by, $sort_order);
    }

    public function clear_cart($user_id)
    {
        if (empty($user_id)) return "Server error";

        return $this->cartDao->clear_cart($user_id);
    }

    public function get_cart_summary_by_user($user_id)
    {
        if (empty($user_id)) return "Server error";

        return $this->cartDao->get_cart_summary_by_user($user_id);
    }
}