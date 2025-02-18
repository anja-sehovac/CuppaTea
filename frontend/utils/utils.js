const Utils = {
    init_spapp: function () {
        var app = $.spapp({
            defaultView: "#signin",
            templateDir: "/frontend/views/"

        });
        app.run();
    }
}