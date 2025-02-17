$(document).ready(function() {
$('#signup-form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // if (!validateForm('#signup-form')) {
    //     return; // Stop AJAX if validation fails
    // }
    
    // Serialize form data
    var formData = $(this).serialize();
    console.log(formData);

    // Send the AJAX request
    $.ajax({
    type: 'POST',
    url: '/web_project/backend/add_user.php', // Adjust the URL to your server endpoint
    data: formData,
    dataType: 'json',
    success: function(response) {
        // Handle success (e.g., display a success message)
        alert('Sign up successful!');
    },
    error: function(xhr, status, error) {
        // Handle error (e.g., display an error message)
        alert('An error occurred: ' + error);
    }
    });
});
});

