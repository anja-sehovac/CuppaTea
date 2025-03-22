const Utils = {
    init_spapp: function () {
        var app = $.spapp({
            defaultView: "#product",
            templateDir: "./../../../web_project/frontend/views/"

        });

        app.route({
            view: "profile",
            onReady: function () {
                display_user_profile();
            }
          });
          
        app.run();
    },
    block_ui: function (element) {
        $(element).block({
            message: '<div class="spinner-border text-primary" role="status"></div>',
            css: {
                backgroundColor: "transparent",
                border: "0",
            },
            overlayCSS: {
                backgroundColor: "#000",
                opacity: 0.25,
            },
        });
    },
    unblock_ui: function (element) {
        $(element).unblock({});
    }
};
