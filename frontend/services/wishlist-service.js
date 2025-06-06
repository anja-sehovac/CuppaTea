var WishlistService = {
  data: [],

  getWishlist: function () {
    RestClient.get("wishlist", function (wishlistData) {
      WishlistService.data = wishlistData;
      WishlistService.renderWishlist(wishlistData);
    }, function (xhr, status, error) {
      toastr.error("Failed to load wishlist.");
      console.error(error);
    });
  },

  renderWishlist: function (items) {
    const container = document.getElementById("wishlistItems");
    container.innerHTML = "";

    if (!items || items.length === 0) {
      container.innerHTML = `<div class="text-white text-center">Your wishlist is empty.</div>`;
      return;
    }

    items.forEach(item => {
      const imageUrl = (item.images && item.images.length > 0)
        ? 'backend/' + item.images[0].image
        : 'frontend/assets/images/earl_grey_tea.jpg';

      const html = `
      <div class="col-12 mb-3">
        <div class="card shadow-sm" style="border: 1px solid; background-color: linear-gradient(135deg, #53342A, #3E241B);">
          <div class="card-body" style="background: linear-gradient(135deg, #2d3833, #1b2420)">
            <div class="row align-items-center">
              <div class="col-md-2 col-sm-4 mb-3 mb-md-0">
                <img src="${imageUrl}" class="img-fluid rounded wishlist-img" alt="${item.name}">
              </div>
              <div class="col-md-4 col-sm-8 mb-3 mb-md-0">
                <h3 class="card-title" style="color: #d6cec4;">${item.name}</h3>
                <div class="mb-2">
                  <span class="fw-bold" style="font-size: 1.25rem; color: #ad9b82;">$${item.price.toFixed(2)}</span>
                </div>
              </div>
              <div class="col-md-3 col-sm-6 mb-3 mb-md-0">
                <label class="form-label" style="font-size: 1.15rem; color: #d6cec4;">Quantity</label>
                <div class="input-group">
                  <button class="btn btn-outline-danger decrease-qty" type="button">-</button>
                  <input type="number" class="form-control text-center quantity-input" value="${item.cart_quantity}" min="1" data-product-id="${item.product_id}" style="background-color: #d6cec4;">
                  <button class="btn btn-outline-success increase-qty" type="button">+</button>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <button class="btn btn-success mb-2 w-100" style="background-color: #4F625A; border-color: #4F625A;">
                  <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn-outline-danger w-100">
                  <i class="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      container.innerHTML += html;
    });

    WishlistService.attachQuantityEvents();
  },

  attachQuantityEvents: function () {
    document.querySelectorAll('.increase-qty').forEach(button => {
      button.addEventListener('click', function () {
        const input = this.parentElement.querySelector('.quantity-input');
        input.value = parseInt(input.value) + 1;
      });
    });

    document.querySelectorAll('.decrease-qty').forEach(button => {
      button.addEventListener('click', function () {
        const input = this.parentElement.querySelector('.quantity-input');
        let currentValue = parseInt(input.value);
        if (currentValue > 1) {
          input.value = currentValue - 1;
        }
      });
    });
  }
};
