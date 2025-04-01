<?php
require_once __DIR__ . "/BaseDao.php";

class CartDao extends BaseDao {
    public function __construct()
    {
        parent::__construct('cart');
    }

    public function add_to_cart($user_id, $product_id)
    {
        $cart_item = $this->query_unique(
            "SELECT * FROM cart WHERE user_id = :user_id AND product_id = :product_id",
            ["user_id" => $user_id, "product_id" => $product_id]
        );

        if ($cart_item) {
            // Increase quantity by 1
            $new_quantity = $cart_item['quantity'] + 1;
            $this->update_quantity($user_id, $product_id, $new_quantity);
        } else {
            // Insert new item
            $this->insert("cart", [
                "user_id" => $user_id,
                "product_id" => $product_id,
                "quantity" => 1
            ]);
        }
    }

    public function remove_from_cart($user_id, $product_id)
    {
        $query = "DELETE FROM cart WHERE user_id = :user_id AND product_id = :product_id";
        $this->query($query, [
            "user_id" => $user_id,
            "product_id" => $product_id
        ]);
    }

    public function update_quantity($user_id, $product_id, $quantity)
    {
        $query = "UPDATE cart SET quantity = :quantity WHERE user_id = :user_id AND product_id = :product_id";
        $this->query($query, [
            "quantity" => $quantity,
            "user_id" => $user_id,
            "product_id" => $product_id
        ]);
    }

    public function get_cart_by_user($user_id, $search = "", $sort_by = "name", $sort_order = "asc")
{
    $allowed_sort_columns = ["name", "price_each"];
    $allowed_sort_order = ["asc", "desc"];

    if (!in_array(strtolower($sort_by), $allowed_sort_columns)) {
        $sort_by = "name";
    }

    if (!in_array(strtolower($sort_order), $allowed_sort_order)) {
        $sort_order = "asc";
    }

    $query = "SELECT 
                p.id AS product_id,
                p.name,
                p.category_id,
                p.price_each AS price,
                p.description,
                c.quantity AS cart_quantity
              FROM cart c
              JOIN product p ON c.product_id = p.id
              WHERE c.user_id = :user_id";

    $params = ["user_id" => $user_id];

    // 🔥 dodaj filter ako postoji pretraga
    if (!empty($search)) {
        $query .= " AND LOWER(p.name) LIKE :search";
        $params["search"] = "%" . strtolower($search) . "%";
    }

    $query .= " ORDER BY $sort_by $sort_order";

    return $this->query($query, $params);
}






public function clear_cart($user_id)
    {
        $this->query("DELETE FROM cart WHERE user_id = :user_id", ["user_id" => $user_id]);
    }
}