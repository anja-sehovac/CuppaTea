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