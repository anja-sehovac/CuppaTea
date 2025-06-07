var OrderService = {
  statusList: [],

  getAllOrders: function () {
    RestClient.get("order/statuses", function (statuses) {
      OrderService.statusList = statuses; // cache

      RestClient.get("order/all_orders", function (data) {
        Utils.datatable(
          "ordersTable",
          [
            { data: 'order_id', title: 'Order ID' },
            { data: 'order_date', title: 'Date and Time' },
            { data: 'product_names', title: 'Products' },
            { data: 'quantities', title: 'Product Quantities' },
            { data: 'total_price', title: 'Total Price' },
            {
              data: null,
              title: 'Status',
              render: function (data, type, row) {
                return OrderService.renderStatusDropdown(row);
              }
            },
            {
            title: 'Actions',
                render: function (data, type, row, meta) {
                    const rowStr = encodeURIComponent(JSON.stringify(row));
                    return `<div class="d-flex justify-content-center gap-2 mt-1">
                    <button class="btn btn-danger delete-order-btn" data-order-id="${row.order_id}">Delete</button>
                    </div>
                    `;
                }
            }
          ],
          data,
          10
        );
      }, function (xhr, status, error) {
        console.error('Error fetching orders:', error);
      });

    }, function (xhr, status, error) {
      console.error('Error fetching statuses:', error);
    });
  },

  renderStatusDropdown: function (order) {
    const options = OrderService.statusList.map(status => {
      const selected = status.name === order.status_name ? "selected" : "";
      return `<option value="${status.id}" ${selected}>${status.name}</option>`;
    }).join("");

    return `
      <select class="form-select order-status-dropdown" data-order-id="${order.order_id}">
        ${options}
      </select>`;
  },

  updateOrderStatus: function (orderId, newStatusId) {
    RestClient.put(
      `order/update`,
      { order_id: orderId, new_status_id: newStatusId },
      function () {
        toastr.success("Order status updated.");
      },
      function () {
        toastr.error("Failed to update order status.");
      }
    );
  },

    openDeleteConfirmationDialog: function (orderId) {
    if (!orderId) {
        toastr.error("Order ID not provided.");
        return;
    }
    OrderService.deleteOrder(orderId);
    },

  deleteOrder: function (orderId) {
  if (!orderId) {
    toastr.error("Order ID not provided.");
    return;
  }

  if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
    return;
  }

  Utils.block_ui("body"); // You can change this selector to match your UI

  RestClient.delete(
    `order/remove/${orderId}`,
    {},
    function (response) {
      toastr.success("Order has been deleted successfully.");
      OrderService.getAllOrders();
    },
    function (error) {
      toastr.error("Error deleting the order.");
    }
  );
    Utils.unblock_ui("body");
  },
  getUserOrders: function () {
  RestClient.get("order/all", function (data) {
    Utils.datatable(
      "dashboard_table1",
      [
        { data: 'order_id', title: 'Order ID' },
        { data: 'order_date', title: 'Date' },
        { data: 'product_names', title: 'Product Name' },
        { data: 'quantities', title: 'Quantity' },
        { data: 'total_price', title: 'Total' },
        { data: 'status_name', title: 'Status' }
      ],
      data,
      5
    );
  }, function (xhr, status, error) {
    console.error('Error fetching user orders:', error);
    toastr.error("Failed to load your orders.");
  });
},

checkout: function () {
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const country = document.getElementById("country").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Basic validation
  if (!name || !surname || !address || !city || !country || !phone) {
    toastr.warning("Please fill in all fields before checkout.");
    return;
  }

  const payload = {
    name: name,
    surname: surname,
    address: address,
    city: city,
    country: country,
    phone_number: phone
  };

  Utils.block_ui("body");

  RestClient.post("order/add", payload,
    function (response) {
      toastr.success("Purchase successful!");
      OrderService.clearCart(); // if you have this function
      // optionally redirect or refresh cart page
      OrderService.getUserOrders(); // or custom success handler
      OrderService.clearCheckoutForm();
    },
    function (error) {
      toastr.error("Failed to complete purchase. Please try again.");
    }
  );

  Utils.unblock_ui("body");
},

clearCart() {
  Utils.block_ui("body");

  RestClient.delete("cart/clear", {},
    function (response) {
      // Backend success → now clear frontend/cart UI
      localStorage.removeItem("cart");
      document.getElementById("cartItems").innerHTML = "";
      document.getElementById("cartItemCount").innerText = "0 items";
      document.getElementById("cart-total-value").innerText = "$0.00";
      toastr.success("Cart has been successfully cleared.");
    },
    function (error) {
      toastr.error("Failed to clear cart on server.");
    }
  );

  Utils.unblock_ui("body");
},

clearCheckoutForm: function () {
  const fields = ["name", "surname", "address", "city", "country", "phone"];
  fields.forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = "";
  });
}







};