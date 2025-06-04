var BrowseService = {
    loadProducts: function (filters = {}) {
  console.log("loadProducts() called with filters:", filters);
  const safeFilters = { ...filters, _: Date.now() }; // Copy + cache buster

  const params = new URLSearchParams(safeFilters).toString();
  const url = `products?${params}`;

  RestClient.get(
    url,
    function (products) {
      const container = document.getElementById("products-list");
      container.innerHTML = "";

      if (!products.length) {
        container.innerHTML = "<div class='col-12 text-center'>No products found.</div>";
        return;
      }

      products.forEach(product => {
        container.innerHTML += `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title mb-3">${product.name}</h5>
                <p class="mb-1"><strong>Category:</strong> ${product.category_name}</p>
                <p class="mb-1"><strong>Price:</strong> $${product.price_each}</p>
                <p class="mb-1"><strong>Quantity:</strong> ${product.quantity}</p>
                <p class="mb-1">${product.description || ""}</p>
              </div>
            </div>
          </div>
        `;
      });
    },
    function () {
      document.getElementById("products-list").innerHTML =
        "<div class='col-12 text-center'>Failed to load products.</div>";
    }
  );
}
};