// app.route({
//     view: "login",
//     load: "login.html",
//     onCreate: function () {},
//     onReady: function () {},
// });
// var app = $.spapp({
//     defaultView: "#login",
//     templateDir: "../views/",
//     pageNotFound: "error_404",
//     reloadView: true,
// });

// loginForm = function () {
//     FormValidation.validate("login-form", {
//             email: {
//                 required: true,
//                 email: true
//             },
//             password: {
//                 required: true,
//                 minlength: 3
//             }
//         },
//         {
//             email: {
//                 required: "Please enter your email address.",
//                 email: "Please enter a valid email address."
//             },
//             password: {
//                 required: "Please provide a password.",
//                 minlength: "Password must be at least 2 characters long.",
//                 maxlength: "Password cannot exceed 10 characters."
//             }
//         }, function (data) {
//         Utils.block_ui("#login-form");
//         RestClient.post(
//             "login",
//             data,
//             function (response) {
//                 window.localStorage.setItem("token", response.token);
//                 window.localStorage.setItem("user_id", response.id);
//                 window.localStorage.setItem("user", response.first_name);
//                 Utils.unblock_ui("login-button");
//                 toastr.success("You logged in successfully.");
//                 window.location.hash = "#profile";
//             },
//             function (error) {
//                 toastr.error("Error occurred while logging into your account.");
//             }
//         );
//         Utils.unblock_ui("#login-form")
//     });
// };
$(document).ready(function () {
    function toggleHeaderFooter() {
        const hash = window.location.hash; // Get the current URL hash
        if (hash === "#login" || hash === "#signin") {
            $("header, footer").hide();
        } else {
            $("header, footer").show();
        }
    }

    // Run on page load
    toggleHeaderFooter();

    // Run when navigation occurs
    $(window).on("hashchange", function () {
        toggleHeaderFooter();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        const currentPage = window.location.hash || "#dashboard"; // Default to dashboard
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });
    }

    // Update active link when page loads
    updateActiveLink();

    // Listen for hash changes (SPA navigation)
    window.addEventListener("hashchange", updateActiveLink);
});