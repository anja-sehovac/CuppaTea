var ProductService = {
  init: function () {
    ProductService.loadCategories();
    
    $('#addItemModal').on('show.bs.modal', function () {
      const form = document.getElementById('addItemForm');
      if (form) {
        form.reset();

        const fileInput = form.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }

        const selects = form.querySelectorAll('select');
        selects.forEach(select => {
          select.selectedIndex = 0;
        });
      }
    });
    FormValidation.validate(
      "#addItemForm",
      {
        name: "required",
        category_id: "required",
        quantity: {
          required: true,
          digits: true,
          min: 1
        },
        price_each: {
          required: true,
          number: true,
          min: 0.01
        }
      },
      {
        name: "Please enter the product name.",
        category_id: "Please enter the product category.",
        quantity: {
          required: "Please enter the quantity.",
          digits: "Quantity must be a whole number.",
          min: "Quantity must be at least 1."
        },
        price_each: {
          required: "Please enter the price.",
          number: "Price must be a valid number.",
          min: "Price must be at least 0.01."
        }
      },
      ProductService.addProduct
    );
  },

  addProduct: function (data) {
    ProductService.loadCategories()
    Utils.block_ui("#addItemForm");

    RestClient.post(
      "products/add",
      data,
      function (response) {
        const productId = response.id;

        const filesInput = document.getElementById("formFileMultiple");
        if (filesInput.files.length > 0) {
          let uploaded = 0;
          for (let i = 0; i < filesInput.files.length; i++) {
            const singleForm = new FormData();
            singleForm.append("product_image", filesInput.files[i]);

            RestClient.uploadFile(
              `products/upload_image/${productId}`,
              singleForm,
              function () {
                uploaded++;
                if (uploaded === filesInput.files.length) {
                  toastr.success("Product and all images uploaded.");
                  $("#addItemModal").modal("hide");
                  ProductService.getAllProducts();
                  Utils.unblock_ui("#addItemForm");
                }
              },
              function () {
                toastr.error("One or more images failed to upload.");
                Utils.unblock_ui("#addItemForm");
              }
            );
          }
        } else {
          toastr.success("Product added without images.");
          $("#addItemModal").modal("hide");
          ProductService.getAllProducts();
          Utils.unblock_ui("#addItemForm");
        }
      },
      function (error) {
        toastr.error("Failed to add product.");
        Utils.unblock_ui("#addItemForm");
      }
    );
  },
  getAllProducts : function(){
    RestClient.get("products", function(data){
        Utils.datatable('itemsTable', [
            { data: 'name', title: 'Name' },
            { data: 'category_name', title: 'Category' },
            { data: 'quantity', title: 'Quantity' },
            { data: 'price_each', title: 'Price' },
            { data: 'description', title: 'Description' },
            {
            title: 'Actions',
                render: function (data, type, row, meta) {
                    const rowStr = encodeURIComponent(JSON.stringify(row));
                    return `<div class="d-flex justify-content-center gap-2 mt-3">
                        <button class="btn btn-sm btn-success save-order" data-bs-target="#editItemModal" onclick="ProductService.openEditModal('${row.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="ProductService.openDeleteConfirmationDialog(decodeURIComponent('${rowStr}'))">Delete</button>
                    </div>
                    `;
                }
            }
        ], data, 10);
    }, function (xhr, status, error) {
        console.error('Error fetching data from file:', error);
    });
  },
getProductById: function(id, callback) {
  RestClient.get('products/' + id, function(data) {
    console.log("=== PRODUCT DATA ===", data);

    localStorage.setItem('selected_product', JSON.stringify(data));

    $('input[name="name"]').val(data.name);
    $('input[name="quantity"]').val(data.quantity);
    $('input[name="price_each"]').val(data.price_each);
    $('input[name="description"]').val(data.description);

    RestClient.get('categories/category?name=' + encodeURIComponent(data.category), function (categoryData) {
      if (categoryData && categoryData.id) {
        $('select[name="category_id"]').val(categoryData.id).trigger('change');
      } else {
        console.error('Category ID not found for category:', data.category);
      }

      if (callback) callback(); // ✅ pozovi modal tek kad sve završi
    });

  }, function(xhr, status, error) {
    console.error('Error fetching product data:', error);
  });
},






  openEditModal: function (id) {
  Utils.block_ui("#editItemModal");

  ProductService.loadCategories().then(function () {
    ProductService.getProductById(id, function () {
      $('#editItemModal').modal('show');
      Utils.unblock_ui("#editItemModal");
    });
  });
},


  loadCategories: function () {
  return new Promise(function (resolve, reject) {
    RestClient.get('categories', function (categories) {
      const categorySelect = $('select[name="category_id"]');
      categorySelect.empty(); // Clear existing options

      categories.forEach(function (category) {
        categorySelect.append(
          $('<option>', {
            value: category.id,
            text: category.name,
          })
        );
      });

      resolve(); // Sve prošlo dobro
    }, function (xhr, status, error) {
      console.error('Failed to load categories:', error);
      reject(error);
    });
  });
},

updateProduct: function () {
  const product = JSON.parse(localStorage.getItem("selected_product"));
  const productId = product.id;

  const updatedData = {
    name: $('#editItemForm input[name="name"]').val(),
    quantity: parseInt($('#editItemForm input[name="quantity"]').val()),
    price_each: parseFloat($('#editItemForm input[name="price_each"]').val()),
    description: $('#editItemForm input[name="description"]').val(),
    category_id: parseInt($('#editItemForm select[name="category_id"]').val())
  };

  console.log("=== UPDATE PRODUCT ===", updatedData);

  Utils.block_ui("#editItemModal");

  RestClient.put(
    "products/update/" + productId,
    updatedData,
    function () {
      toastr.success("Product updated successfully.");
      $("#editItemModal").modal("hide");
      ProductService.getAllProducts();
      Utils.unblock_ui("#editItemModal");
    },
    function () {
      toastr.error("Failed to update product.");
      Utils.unblock_ui("#editItemModal");
    }
  );
},

openDeleteConfirmationDialog: function (productStr) {
  try {
    const product = JSON.parse(productStr);
    ProductService.deleteProduct(product.id);
  } catch (e) {
    console.error("Invalid product data for deletion:", e);
    toastr.error("Failed to parse product data.");
  }},

  deleteProduct: function (productId) {
  if (!productId) {
    toastr.error("Product ID not provided.");
    return;
  }

  if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
    return;
  }

  Utils.block_ui("body"); // You can change this selector to match your UI

  RestClient.delete(
    `products/delete/${productId}`,
    {},
    function (response) {
      toastr.success("Product has been deleted successfully.");
      ProductService.getAllProducts();
    },
    function (error) {
      toastr.error("Error deleting the product.");
    }
  );

  Utils.unblock_ui("body");
},







   

};